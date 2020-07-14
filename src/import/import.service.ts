import { writeFile, readFileSync } from 'fs'
import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { getRepository } from 'typeorm';
import { Country } from '../countries/country.entity';
import { Currency } from '../currencies/currencies.entity';

@Injectable()
export class ImportService {
  constructor(public readonly service: CountriesService) {}

  repository = getRepository(Country)

  async getAllCountries() {

    return this.repository.createQueryBuilder('country')
      .leftJoinAndSelect('country.currency', 'currency')
      .leftJoinAndSelect('country.language', 'language')
      .leftJoinAndSelect('country.regions', 'region')
      .innerJoinAndSelect('region.cities', 'city')
      .getMany()

  }

  async exportJson() {
    const countries = await this.getAllCountries();
    await writeFile('./data/data.json', JSON.stringify(countries), 'utf8', function(error) {
      if (error) {
        return { error: error.toString() }
      }
    })
    return { success: true }
  }

  async importJson() {
    console.log('importCurrencies')
    const data = await readFileSync('data/data.json')
    const json = JSON.parse(data)
    console.log('JSON', json)

      return { success: true }
  }
}
