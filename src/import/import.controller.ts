import { Controller, Get } from '@nestjs/common';
import { ImportCsvService } from './import.csv.service';
import { CountriesService } from '../countries/countries.service';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(
    private importCsvService: ImportCsvService,
    private importService: ImportService,
    private countriesService: CountriesService,
  ) {}

  @Get()
  async import(): Promise<any> {
    return this.importService.importJson()
  }

  @Get('export')
  async export(): Promise<any> {
    return 'exported'
  }

  @Get('csv')
  async importCsv(): Promise<any> {
    return this.importCsvService.importCsv();
  }
}
