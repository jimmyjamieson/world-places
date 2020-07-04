import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContinentEntity } from './continent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContinentsService extends TypeOrmCrudService<ContinentEntity>{
  constructor(@InjectRepository(ContinentEntity) repo: Repository<ContinentEntity>) {
    super(repo);
  }
}

