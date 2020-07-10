import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import csv from 'csv-parser';
import { Country } from '../countries/country.entity';
import { getManager } from 'typeorm';
import { Currency } from '../currencies/currencies.entity';
import { Continent } from '../continents/continent.entity';
import { Region } from '../regions/region.entity';
import { Language } from '../languages/languages.entity';
import { City } from '../cities/cities.entity';
import { continents } from './data';

@Injectable()
export class ImportService {
  constructor() {}

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

  async startImportCsv() {
    await this.importCurrencies()
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
      })
      .on('end', () => this.importLanguages());
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
        const { code, name, nativeName, code2 } = data;
        const obj = {
          name,
          nativeName: nativeName || name,
          code,
          code_iso_3: code2,
        };
        this.entityManager.save(Language, obj);
      }).on('end', () => this.importContinents());
  }

  async importContinents() {
    await this.entityManager.save(Continent, [...continents]);
    await this.importCountries()
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
        const currency = currencies.find(item => item.code === currencyCode);
        const language = languages.find(
          item => item.code_iso_3 === languageCode,
        );

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
          continent: continent?.id,
          currency: currency?.id,
          language: language?.id,
          subContinent,
          coords: `${lat},${lng}`,
        };
        // @ts-ignore
        this.entityManager.save(Country, obj);
      }).on('end', () => this.importRegions());
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
          country: country?.id,
        };
        // @ts-ignore
        this.entityManager.save(Region, obj);
      }).on('end', () => this.importCities());
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
          region: region?.id,
          coords: `${latitude},${longitude}`,
        };
        // @ts-ignore
        this.entityManager.save(City, obj);
      });
  }

  async importCsv() {
    await this.startImportCsv();
    return { success: true };
  }
}
