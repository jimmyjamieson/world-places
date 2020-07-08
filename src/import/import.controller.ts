import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(
    private importService: ImportService
  ) {}

  @Get()
  async importAll(): Promise<any> {
    return this.importService.importAll()
  }

}
