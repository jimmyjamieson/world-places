import * as _ from 'lodash';
import { writeFile, readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { getRepository } from 'typeorm';
import { Country } from '../countries/country.entity';
import writeToJson from '../utils/write-json';
import { Language } from '../languages/languages.entity';
import { Region } from '../regions/region.entity';
import { City } from '../cities/cities.entity';
import { Currency } from '../currencies/currencies.entity';

@Injectable()
export class ImportService {
  constructor(public readonly countryService: CountriesService) {}

  countryRepository = getRepository(Country);
  languageRepository = getRepository(Language);
  currencyRepository = getRepository(Currency);
  regionRepository = getRepository(Region);
  cityRepository = getRepository(City)

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
    return this.countryRepository.createQueryBuilder('country').getMany();
  }

  async getRegions() {
    return this.regionRepository.createQueryBuilder('region').getMany();
  }

  async getCities() {
    return this.cityRepository.createQueryBuilder('city').getMany();
  }

  async getLanguages() {
    return this.languageRepository.createQueryBuilder('language').getMany();
  }

  async getCurrencies() {
    return this.currencyRepository.createQueryBuilder('currency').getMany();
  }

  async exportJson() {
    const all = await this.getAll();
    await writeToJson(all, './data/all.json')

    const countries = await this.getCountries();
    await writeToJson(countries, './data/countries.json')

    const regions = await this.getRegions();
    await writeToJson(regions, './data/regions.json')

    const cities = await this.getCities();
    await writeToJson(cities, './data/cities.json')

    const languages = await this.getLanguages();
    await writeToJson(languages, './data/languages.json')

    const currencies = await this.getCurrencies();
    await writeToJson(currencies, './data/currencies.json')

    return { success: true };
  }

  async importJson() {
    const json = await readFileSync('data/data.json').toString();
    const data = JSON.parse(json);

    const countries = await data.map(country => {
      const {
        id,
        name,
        nativeName,
        code,
        coords,
        continent,
        subContinent,
        countryCode,
        currency,
        language,
        regions,
      } = country;
    });

    const currencies = _.uniqBy(_.map(data, 'currency'), 'id')
    const languages = _.uniqBy(_.map(data, 'language'), 'id')
    const regions = _.uniqBy(_.map(data, 'regions'), 'id')[0]

    const allCities = []
    regions.map((region) => {
      const { cities } = region
      allCities.push(cities[0])
    })

    return { allCities };
  }
}
