import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import csv from 'csv-parser';
import { Country } from '../countries/country.entity';
import removeUnicode from '../utils/remove-unicode';
import { getManager } from 'typeorm';
import { CountriesService } from '../countries/countries.service';
import { ContinentsService } from '../continents/continents.service';
import { Currency } from '../currencies/currencies.entity';
import { CurrenciesService } from '../currencies/currencies.service';
import { Continent } from '../continents/continent.entity';
import { Region } from '../regions/region.entity';
import { Language } from '../languages/languages.entity';
import { LanguagesService } from '../languages/languages.service';
import { City } from '../cities/cities.entity';
import { RegionsService } from '../regions/regions.service';
import { continents } from './data';

@Injectable()
export class ImportService {
  constructor(
    private readonly csvParser: CsvParser,
    private readonly countriesService: CountriesService,
    private readonly continentsService: ContinentsService,
    private readonly regionsService: RegionsService,
    private readonly currenciesService: CurrenciesService,
    private readonly languagesService: LanguagesService,
  ) {}

  entityManager = getManager();
  async getAllContinents() {
    return await this.entityManager.find(Continent);
  }
  async getAllCountries() {
    return await this.entityManager.find(Country);
  }
  async getAllRegions() {
    return await this.entityManager.find(Region);
  }
  async getAllLanguages() {
    return await this.entityManager.find(Language);
  }
  async getAllCurrencies() {
    return await this.entityManager.find(Currency);
  }

  async importFile(entity, file) {
    const stream = await createReadStream(file);
    const csv: ParsedData<any> = await this.csvParser.parse(
      stream,
      entity,
      null,
      null,
      {
        strict: true,
        separator: ',',
        mapHeaders: ({ header, index }) => header.toLowerCase(),
      },
    );
    return csv;
  }

  async importCurrencies() {
    await createReadStream('import/currencies.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const { name, code, number, decimals } = data;
        const obj = {
          name,
          nativeName: name,
          code,
          number,
          decimals,
        };
        this.entityManager.save(Currency, obj);
      });
  }

  async importLanguages() {
    await createReadStream('import/languages.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const { code, name, nativeName } = data;
        const obj = {
          name,
          nativeName: nativeName || name,
          code,
        };
        this.entityManager.save(Language, obj);
      });
  }

  async importContinents() {
    await this.entityManager.save(Continent, [...continents]);
  }

  async importCountries() {
    const continents = await this.getAllContinents();
    const currencies = await this.getAllCurrencies();
    const languages = await this.getAllLanguages();

    await createReadStream('import/countries.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const name = data[Object.keys(data)[0]]; // TODO: weird fix until unicode removal works for that extra space
        const {
          nativename: nativeName,
          topleveldomain__001: domain,
          alpha2code: code,
          alpha3code: code_alpha_3,
          callingcodes__001: telephone,
          capital,
          region: continentName,
          subregion: subContinent,
          latlng__001: lat,
          latlng__002: lng,
          demonym,
          area,
          timezones__001: timezone,
          currencies__code: currencyCode,
          languages__iso639_1: languageCode,
        } = data;

        const continent = continents.find(item => item.name === continentName);
        const currency = currencies.find(item => item.code === currencyCode)
        const language = languages.find(item => item.code === languageCode)

        const obj = {
          name,
          nativeName: nativeName || name,
          demonym,
          code,
          code_alpha_3,
          area,
          capital,
          telephone,
          timezone,
          domain,
          continent: continent,
          currency: currency,
          language: language,
          subContinent,
          coords: `${lat},${lng}`,
        };
        this.entityManager.save(Country, obj);
      });
  }

  async importRegions() {

    const countries = await this.getAllCountries();

    await createReadStream('import/regions.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const { name, state_code: code, country_code } = data;
        const country = countries.find(item => item.code === country_code);
        const obj = {
          name,
          nativeName: name,
          code,
          country: country,
        };
        this.entityManager.save(Region, obj);
      });
  }

  async importCities() {
    const regions = await this.getAllRegions();

    await createReadStream('import/cities.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const { name, region_code, latitude, longitude } = data;
        const region = regions.find(item => item.code === region_code);
        const obj = {
          name,
          nativeName: name,
          region: region,
          coords: `${latitude},${longitude}`,
        };
        this.entityManager.save(City, obj);
      });
  }

  async importCsv() {
   const languages = await this.importLanguages();
    const currencies = await this.importCurrencies();
    const continents = await this.importContinents();
    const countries = await this.importCountries();
    const regions = await this.importRegions();
    const cities = await this.importCities();
    return { success: true };
  }
}
