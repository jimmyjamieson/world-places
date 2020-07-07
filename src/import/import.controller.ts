import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service';
import removeUnicode from '../utils/remove-unicode';

@Controller('import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @Get()
  importAll(): any {
    return this.importService.importCountries()
  }

}
