import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import csv from 'csv-parser';
import { Country } from '../countries/country.entity';
import { getManager } from 'typeorm';
import { Currency } from '../currencies/currencies.entity';
import { Region } from '../regions/region.entity';
import { Language } from '../languages/languages.entity';
import { City } from '../cities/cities.entity';

@Injectable()
export class ImportService {
  constructor() {}

  entityManager = getManager();
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
    console.log('importCurrencies')
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
          name: name.trim(),
          nativeName: name.trim(),
          code: code.trim(),
          number: number.trim(),
          decimals: decimals.trim(),
        };
        this.entityManager.save(Currency, obj);
      })
      .on('end', () => setTimeout(() => this.importLanguages(), 5000));
  }

  async importLanguages() {
    console.log('importLanguages')
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
          name: name.trim(),
          nativeName: (nativeName || name).trim(),
          code: code.trim(),
          code_iso_3: code2.trim(),
        };
        this.entityManager.save(Language, obj);
      }).on('end', () => setTimeout(() => this.importCountries(), 5000));
  }

  async importCountries() {
    console.log('importCountries')
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
          alpha2Code: code,
          alpha3Code: code_alpha_3,
          callingcodes__001: telephone,
          capital,
          region,
          subRegion: subRegion,
          latlng__001: lat,
          latlng__002: lng,
          demonym,
          area,
          timezones__001: timezone,
          currencies__code: currencyCode,
          language_code_1: languageCode,
        } = data;

        const currency = currencies.find(item => item.code.includes(currencyCode));
        const language = languages.find(
          item => item.code.includes(languageCode),
        );

        const obj = {
          name: name.trim(),
          nativeName: (nativeName || name).trim(),
          demonym: demonym.trim(),
          code: code.trim(),
          code_alpha_3: code_alpha_3.trim(),
          area: area.trim(),
          capital: capital.trim(),
          telephone: telephone && telephone.trim(),
          timezone: timezone.trim(),
          domain: domain && domain.trim(),
          continent: region && region.trim(),
          subContinent: subRegion && subRegion.trim(),
          currency: currency?.id,
          language: language?.id,
          coords: `${lat && lat.trim()},${lng && lng.trim()}`,
        };
        // @ts-ignore
        this.entityManager.save(Country, obj);
      }).on('end', () => setTimeout(() => this.importRegions(), 60000));
  }

  async importRegions() {
    console.log('importRegions')
    const countries = await this.getAllCountries();

    await createReadStream('import/regions.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const { name, state_code: regionCode, country_code } = data;
        const country = countries.find(item => item?.code.includes(country_code))
        const obj = {
          name: name.trim(),
          nativeName: name.trim(),
          code: regionCode.trim(),
          countryCode: country?.code,
          country: country?.id,
        };
        // @ts-ignore
        this.entityManager.save(Region, obj);
      }).on('end', () => setTimeout(() => this.importCities(), 60000));
  }

  async importCities() {
    console.log('importCities')
    const countries = await this.getAllCountries();
    const regions = await this.getAllRegions();

    await createReadStream('import/cities.csv')
      .pipe(
        csv({
          strict: true,
          separator: ',',
        }),
      )
      .on('data', data => {
        const { name, region_code, country_code, latitude, longitude } = data;
        const region = regions.find(item => (item.code.includes(region_code) && item.countryCode.includes(country_code) ) );

        console.log('region', region)
        const obj = {
          name: name.trim(),
          nativeName: name.trim(),
          region: region?.id,
          coords: `${latitude.trim()},${longitude.trim()}`,
        };
        // @ts-ignore
        this.entityManager.save(City, obj);
      }).on('end', () => setTimeout(() => console.log('Completed'), 120000));
  }

  async importCsv() {
    await this.startImportCsv();
    return { success: true };
  }
}
