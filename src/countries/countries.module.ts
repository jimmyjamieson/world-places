import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CountryEntity])
  ],
  controllers: [CountriesController],
  exports: [CountriesService],
  providers: [CountriesService]
})
export class CountriesModule {}
