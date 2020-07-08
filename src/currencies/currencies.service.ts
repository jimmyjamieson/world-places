import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from './currencies.entity';

@Injectable()
export class CurrenciesService extends TypeOrmCrudService<CurrencyEntity>{
  constructor(@InjectRepository(CurrencyEntity) repo: Repository<CurrencyEntity>) {
    super(repo);
  }
}

