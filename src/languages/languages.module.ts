import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './languages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Language])
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService]
})
export class LanguagesModule {}
