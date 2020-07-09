import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './cities.entity';

@Injectable()
export class CitiesService extends TypeOrmCrudService<City>{
  constructor(@InjectRepository(City) repo: Repository<City>) {
    super(repo);
  }
}

