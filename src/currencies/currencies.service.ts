import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './currencies.entity';

@Injectable()
export class CurrenciesService extends TypeOrmCrudService<Currency>{
  constructor(@InjectRepository(Currency) repo: Repository<Currency>) {
    super(repo);
  }
}

