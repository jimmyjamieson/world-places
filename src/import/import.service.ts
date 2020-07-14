import { writeFile } from 'fs'
import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { getRepository } from 'typeorm';
import { Country } from '../countries/country.entity';

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
    return null
  }
}
