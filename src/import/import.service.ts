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
  }

  /**
   * Import JSON files to database
   */

  async importJson() {
    await this.clearDatabase();

    const currencies = await readFromJson('data/currencies.json');
    const languages = await readFromJson('data/languages.json');
    const countries = await readFromJson('data/countries.json');
    const regions = await readFromJson('data/regions.json');

    await this.currencyRepository.save([...currencies]);
    await this.languageRepository.save([...languages]);

    const formattedCountries = countries.map(country => {
      const { currency, language, ...rest } = country;
      const getCurrency =
        currencies.find(item => item.code === currency?.code) || undefined;
      const getLanguage =
        languages.find(item => item.code === language?.code) || undefined;

      return {
        ...rest,
        language: getLanguage?.id,
        currency: getCurrency?.id,
      };
    });

    await this.countryRepository.save([...formattedCountries]);

    const formattedRegions = regions.map(region => {
      const { country, ...rest } = region;
      const getCountry =
        countries.find(item => item.code === country?.code) || undefined;

      return {
        ...rest,
        country: getCountry?.id,
      };
    });

    await this.regionRepository.save([...formattedRegions]);


    /**
     * Set our transform for streamable JSON data
     * @param key
     * @param value
     */
    const cityTransform = (key, value) => {
      const { region, ...rest } = value;
      return {
        ...rest,
        region: region?.id,
      };
    };
    /**
     * Save our JSON data into the database
     */
    saveLargeJson(
      'data/cities.json',
      data => this.cityRepository.save(data),
      cityTransform,
      1,
    );
  }
}
