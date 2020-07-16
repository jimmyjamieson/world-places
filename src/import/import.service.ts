import StreamArray from 'stream-json/streamers/StreamArray';
import { Writable } from 'stream'
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
    await this.countryRepository.query(
      `TRUNCATE country, language, currency, region, city CASCADE`,
    );
  }

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

    const self = this
    const stream = await createReadStream('data/cities.json', {
      flags: 'r',
      encoding: 'utf-8',
    })
    const jsonStream = StreamArray.withParser();

    const processingStream = new Writable({
      write({key, value}, encoding, callback) {
        //Save to mongo or do any other async actions
        const { region, ...rest } = value;
        const formattedData = {
          ...rest,
          region: region?.id,
        };

        self.cityRepository.save(formattedData)

        setTimeout(() => {
          console.log(value);
          //Next record will be read only current one is fully processed
          callback();
        }, 1);
      },
      //Don't skip this, as we need to operate with objects, not buffers
      objectMode: true
    });

    //Pipe the streams as follows
    stream.pipe(jsonStream.input);
    jsonStream.pipe(processingStream);

//So we're waiting for the 'finish' event when everything is done.
    processingStream.on('finish', () => console.log('All done'));



  }
}
