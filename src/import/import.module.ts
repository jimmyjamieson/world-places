import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';

@Module({
  imports: [
    CsvModule,
  ],
  providers: [ImportService],
  controllers: [ImportController]
})
export class ImportModule {}
