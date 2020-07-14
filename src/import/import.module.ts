import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ImportCsvService } from './import.csv.service';
import { ImportController } from './import.controller';
import { CountriesModule } from '../countries/countries.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { RegionsModule } from '../regions/regions.module';
import { LanguagesModule } from '../languages/languages.module';
import { ImportService } from './import.service';

@Module({
  imports: [
    CsvModule,
    CurrenciesModule,
    CountriesModule,
    RegionsModule,
    LanguagesModule,
  ],
  providers: [ImportCsvService, ImportService],
  controllers: [ImportController],
})
export class ImportCsvModule {}
