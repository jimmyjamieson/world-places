import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { CountriesModule } from '../countries/countries.module';
import { ContinentsModule } from '../continents/continents.module';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [
    CsvModule,
    CurrenciesModule,
    ContinentsModule,
    CountriesModule
  ],
  providers: [ImportService],
  controllers: [ImportController]
})
export class ImportModule {}
