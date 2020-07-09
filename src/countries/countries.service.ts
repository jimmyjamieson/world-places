import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from './country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService extends TypeOrmCrudService<Country>{
  constructor(@InjectRepository(Country) repo: Repository<Country>) {
    super(repo);
  }
}

