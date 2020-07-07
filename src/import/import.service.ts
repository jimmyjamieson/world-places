import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { CountryEntity } from '../countries/country.entity';

@Injectable()
export class ImportService {
  constructor(private readonly csvParser: CsvParser) {}

  async importCountries() {
    console.log('dir', __dirname);
    const stream = createReadStream('import/countries.csv');
    const countriesData: ParsedData<any> = await this.csvParser.parse(
      stream,
      CountryEntity,
    );

    const countries = countriesData.list.map(country => {
      const { name } = country;
      return {
        name,
      };
    });

    return countriesData;
  }
}
