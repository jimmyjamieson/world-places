import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
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
    return null;
  }

  async importJson() {
    const countries = await this.getAllCountries();
    return { countries };
  }
}
