import JSONStream from 'JSONStream';
import devnull from 'dev-null';
import es from 'event-stream';
import { createReadStream, createWriteStream } from 'fs';
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

@Injectable()
export class ImportService {
  constructor(public readonly countryService: CountriesService) {}

  countryRepository = getRepository(Country);
  languageRepository = getRepository(Language);
  currencyRepository = getRepository(Currency);
  regionRepository = getRepository(Region);
  cityRepository = getRepository(City);

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

  async clearDatabase() {
    console.log('clear db');
    await this.countryRepository.query(
      `TRUNCATE country, language, currency, region, city CASCADE`,
    );
    console.log('clear db done');
  }

  async importJson() {
    await this.clearDatabase();

    const currencies = await readFromJson('data/currencies.json');
    const languages = await readFromJson('data/languages.json');
    const countries = await readFromJson('data/countries.json');
    const regions = await readFromJson('data/regions.json');

    await this.currencyRepository.save([...currencies.data]);
    await this.languageRepository.save([...languages.data]);

    const formattedCountries = countries.data.map(country => {
      const { currency, language, ...rest } = country;
      const getCurrency =
        currencies.data.find(item => item.code === currency?.code) || undefined;
      const getLanguage =
        languages.data.find(item => item.code === language?.code) || undefined;

      return {
        ...rest,
        language: getLanguage?.id,
        currency: getCurrency?.id,
      };
    });

    await this.countryRepository.save([...formattedCountries]);

    const formattedRegions = regions.data.map(region => {
      const { country, ...rest } = region;
      const getCountry =
        countries.data.find(item => item.code === country?.code) || undefined;

      return {
        ...rest,
        country: getCountry?.id,
      };
    });

    await this.regionRepository.save([...formattedRegions]);

    const stream = await createReadStream('data/cities.json', {
      flags: 'r',
      encoding: 'utf-8',
    })
      .on('data', data => {
        this.cityRepository.save(data)
      })
      .on('end', () => console.log('end'));

    stream.pipe(JSONStream.parse('data.*')).pipe(
      es.map(function(data, cb) {
        const { region, ...rest } = data;
        const formattedData = {
          ...rest,
          region: region?.id,
        };
        cb(null, formattedData);
        return;
      }),
    );

    return { ok: true };
  }
}
