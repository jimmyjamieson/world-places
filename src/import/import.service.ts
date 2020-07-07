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
      null,
      null,
      {
        strict: true,
        separator: ',',
        mapHeaders: ({ header, index }) => header.toLowerCase(),
      },
    );

    const countries = await countriesData.list.map((country: CountryEntity) => {
      console.log(country, country?.name)
      // @ts-ignore
      const { name } = country;
      // if (!name) return null
      return {
        name : 'bob',
      };
    });


    return countriesData;
  }
}
