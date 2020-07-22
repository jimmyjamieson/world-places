import StreamArray from 'stream-json/streamers/StreamArray';
import { Writable } from 'stream';
import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { getRepository } from 'typeorm';
import { Country } from '../countries/country.entity';
import writeToJson from '../utils/write-json';
import { Language } from '../languages/languages.entity';
import { Region } from '../regions/region.entity';
import { City } from '../cities/cities.entity';
import { Currency } from '../currencies/currencies.entity';
import readFromJson from '../utils/read-json';
import saveLargeJson from '../utils/save-large-json';

@Injectable()
export class ImportService {
  constructor(public readonly countryService: CountriesService) {}

  /**
   * Set our repositories to get and save data
   */

  countryRepository = getRepository(Country);
  languageRepository = getRepository(Language);
  currencyRepository = getRepository(Currency);
  regionRepository = getRepository(Region);
  cityRepository = getRepository(City);

  /**
   * Create our queries for each JSON output
   */
  async getAll() {
    return this.countryRepository
      .createQueryBuilder('country')
      .leftJoinAndSelect('country.currency', 'currency')
      .leftJoinAndSelect('country.language', 'language')
      .leftJoinAndSelect('country.regions', 'region')
      .innerJoinAndSelect('region.cities', 'city')
      .getMany();
  }

  async getCountries() {
    return this.countryRepository
      .createQueryBuilder('country')
      .leftJoinAndSelect('country.currency', 'currency')
      .leftJoinAndSelect('country.language', 'language')
      .getMany();
  }

  async getRegions() {
    return this.regionRepository
      .createQueryBuilder('region')
      .leftJoinAndSelect('region.country', 'country')
      .getMany();
  }

  async getCities() {
    return this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.region', 'region')
      .getMany();
  }

  async getLanguages() {
    return this.languageRepository.createQueryBuilder('language').getMany();
  }

  async getCurrencies() {
    return this.currencyRepository.createQueryBuilder('currency').getMany();
  }

  /**
   * Export database data to JSON files
   */

  async exportJson() {
    const all = await this.getAll();
    await writeToJson(all, './data/all.json');

    const countries = await this.getCountries();
    await writeToJson(countries, './data/countries.json');

    const regions = await this.getRegions();
    await writeToJson(regions, './data/regions.json');

    const cities = await this.getCities();
    await writeToJson(cities, './data/cities.json');

    const languages = await this.getLanguages();
    await writeToJson(languages, './data/languages.json');

    const currencies = await this.getCurrencies();
    await writeToJson(currencies, './data/currencies.json');

    return { success: true };
  }

  /**
   * We need to empty the database when we re-import JSON
   */
  async clearDatabase() {
    await this.countryRepository.query(
      `TRUNCATE country, language, currency, region, city CASCADE`,
    );
    return { success: true, message: 'Database cleared' }
  }

  /**
   * Import JSON files to database
   */

  importCurrencies() {
    console.log('Importing currencies')
    const currencyTransform = (key, value) => {
      return {
        ...value
      }
    }
    return saveLargeJson(
      'data/currencies.json',
      data => this.currencyRepository.save(data),
      currencyTransform,
      1,
      () => this.importLanguages()
    );
  }

  importLanguages() {
    console.log('Importing languages')
    const languageTransform = (key, value) => {
      return {
        ...value
      }
    }
    return saveLargeJson(
      'data/languages.json',
      data => this.languageRepository.save(data),
      languageTransform,
      1,
      () => this.importCountries()
    );
  }

  importCountries() {
    console.log('Importing countries')
    const countryTransform = (key, value) => {
      const { language, currency, ...rest } = value
      return {
        ...rest,
        language: language?.id,
        currency: currency?.id
      }
    }
    return saveLargeJson(
      'data/countries.json',
      data => this.countryRepository.save(data),
      countryTransform,
      1,
      () => this.importRegions()
    );
  }

  importRegions() {
    console.log('Importing regions')
    const regionTransform = (key, value) => {
      const { country, ...rest } = value
      return {
        ...rest,
        country: country?.id
      }
    }
    return saveLargeJson(
      'data/regions.json',
      data => this.regionRepository.save(data),
      regionTransform,
      1,
      () => this.importCities()
    );
  }

  importCities() {
    console.log('Importing cities')
    const cityTransform = (key, value) => {
      const { region, ...rest } = value;
      return {
        ...rest,
        region: region?.id,
      };
    };
    return saveLargeJson(
      'data/cities.json',
      data => this.cityRepository.save(data),
      cityTransform,
      1,
    );
  }

  async importJson() {
    await this.clearDatabase();
    await this.importCurrencies()
    return { success: true, message: 'Importing will happen in the background' }
  }

}
