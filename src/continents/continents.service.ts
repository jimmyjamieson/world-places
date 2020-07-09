import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Continent } from './continent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContinentsService extends TypeOrmCrudService<Continent>{
  constructor(@InjectRepository(Continent) repo: Repository<Continent>) {
    super(repo);
  }
}

