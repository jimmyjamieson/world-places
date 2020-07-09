import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(
    private importService: ImportService
  ) {}

  @Get('csv')
  async importCsv(): Promise<any> {
    return this.importService.importCsv()
  }

}
