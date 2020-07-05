import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CountryEntity } from './country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService extends TypeOrmCrudService<CountryEntity>{
  constructor(@InjectRepository(CountryEntity) repo: Repository<CountryEntity>) {
    super(repo);
  }
}

