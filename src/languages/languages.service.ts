import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './languages.entity';

@Injectable()
export class LanguagesService extends TypeOrmCrudService<Language>{
  constructor(@InjectRepository(Language) repo: Repository<Language>) {
    super(repo);
  }
}