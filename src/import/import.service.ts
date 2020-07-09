import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
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
    const csv = await this.importFile(Currency, 'import/currencies.csv');
    const { list } = csv;

    const currencies = await Promise.all(
      list.map(async currency => {
        const { name, code, number, decimals } = currency;

        return {
          name,
          nativeName: name,
          code,
          number,
          decimals,
        };
      }),
    );

    await Promise.all(
      currencies.map(async currency => {
        try {
          await this.entityManager.save(Currency, currency);
        } catch (e) {
          throw new Error(e);
        }
      }),
    );

    return currencies;
  }

  async importLanguages() {
    const csv = await this.importFile(Currency, 'import/languages.csv');
    const list = await removeUnicode(csv.list); // TODO: Fix unicode name issue

    const languages = await Promise.all(
      list.map(async currency => {
        const { code, name, nativeName } = currency;

        return {
          name,
          nativeName: nativeName || name,
          code,
        };
      }),
    );

    await Promise.all(
      languages.map(async language => {
        try {
          await this.entityManager.save(Language, language);
        } catch (e) {
          throw new Error(e);
        }
      }),
    );

    return languages;
  }

  async importContinents() {
    const continents = [
      {
        code: 'AF',
        name: 'Africa',
        nativeName: 'Alkebulan',
        coords: '2.194216,5.2010515',
      },
      {
        code: 'AN',
        name: 'Antarctica',
        nativeName: 'Antarctica',
        coords: '-68.1483765,-47.5215509',
      },
      {
        code: 'AS',
        name: 'Asia',
        nativeName: 'Asia',
        coords: '23.8402413,62.5723401',
      },
      {
        code: 'EU',
        name: 'Europe',
        nativeName: 'Europe',
        coords: '48.1327673,4.1753323',
      },
      {
        code: 'NA',
        name: 'North America',
        nativeName: 'North America',
        coords: '31.8020063,-146.3208868',
      },
      {
        code: 'OC',
        name: 'Oceania',
        nativeName: 'Oceania',
        coords: '8.6094367,91.4571963',
      },
      {
        code: 'SA',
        name: 'South America',
        nativeName: 'South America',
        coords: '15.6283945,-100.463162',
      },
      {
        code: 'AM',
        name: 'Americas',
        nativeName: 'Americas',
        coords: '0.7304993,165.3611447',
      },
    ];

    await Promise.all(
      continents.map(async continent => {
        try {
          await this.entityManager.save(Continent, continent);
        } catch (e) {
          throw new Error(e);
        }
      }),
    );

    return continents;
  }

  async importCountries() {
    const csv = await this.importFile(Country, 'import/countries.csv');
    const list = await removeUnicode(csv.list); // TODO: Fix unicode name issue

    const countries = await Promise.all(
      list.map(async country => {
        const name = country[Object.keys(country)[0]]; // TODO: weird fix until unicode removal works for that extra space
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
        } = await country;

        const continent = await this.continentsService.findOne({
          where: {
            name: continentName,
          },
        });

        const currency = await this.currenciesService.findOne({
          where: {
            code: currencyCode,
          },
        });

        const language = await this.languagesService.findOne({
          where: {
            code: languageCode,
          },
        });

        return {
          name,
          nativeName,
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
      }),
    );

    await Promise.all(
      countries.map(async country => {
        try {
          await this.entityManager.save(Country, country);
        } catch (e) {
          throw new Error(e);
        }
      }),
    );

    return countries;
  }

  async importRegions() {
    const csv = await this.importFile(Country, 'import/regions.csv');
    const list = await removeUnicode(csv.list); // TODO: Fix unicode name issue

    const regions = await Promise.all(
      list.map(async region => {
        const { name, state_code: code, country_code } = region;

        const country = await this.countriesService.findOne({
          where: {
            code: country_code,
          },
        });

        console.log('country', country)

        return {
          name,
          nativeName: name,
          code,
          country: country?.id,
        };
      }),
    );

    await Promise.all(
      regions.map(async region => {
        try {
          await this.entityManager.save(Region, region);
        } catch (e) {
          throw new Error(e);
        }
      }),
    );

    return regions;
  }

  async importCities() {
    console.log('starting import cities')
    const csv = await this.importFile(Currency, 'import/cities.csv');
    const list = await removeUnicode(csv.list); // TODO: Fix unicode name issue

    const cities = await Promise.all(
      list.map(async city => {
        const { name, region_code, latitude, longitude } = city;

        const region = await this.regionsService.findOne({
          where: {
            code: region_code,
          },
        });

        console.log('region', region)

        return {
          name,
          nativeName: name,
          coords: `${latitude},${longitude}`,
          region: region?.id,
        };
      }),
    );

    await Promise.all(
      cities.map(async city => {
        try {
          await setTimeout(() => this.entityManager.save(City, city), 1000)
        } catch (e) {
          throw new Error(e);
        }
      }),
    );

    return cities;
  }

  async importCsv() {
    const languages = await this.importLanguages();
    const currencies = await this.importCurrencies();
    const continents = await this.importContinents();
    const countries = await this.importCountries();
    const regions = await this.importRegions();
    const cities = await this.importCities();
    return {
      imported: {
        currencies,
        languages,
        continents,
        countries,
        regions,
        cities,
      },
    };
  }
}
