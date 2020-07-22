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
  async importJson(): Promise<any> {
    return this.importService.importJson()
  }

  @Get('reset')
  async clearDatabase(): Promise<any> {
    return this.importService.clearDatabase()
  }

  @Get('export')
  async exportJson(): Promise<any> {
    return this.importService.exportJson()
  }

  @Get('csv')
  async importCsv(): Promise<any> {
    return this.importCsvService.importCsv();
  }
}
