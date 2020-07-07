import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { CountryEntity } from '../countries/country.entity';
import removeUnicode from '../utils/remove-unicode';

@Injectable()
export class ImportService {
  constructor(private readonly csvParser: CsvParser) {}

  async importCountries() {
    const stream = await createReadStream('import/countries.csv');
    const csv: ParsedData<any> = await this.csvParser.parse(
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

    const list = await removeUnicode(csv.list);

    let countries = [];
    list.map(country => {
      const name = country[Object.keys(country)[0]]; // weird fix until unicode removal works for that extra space
      const {
        topleveldomain__001: domain,
        alpha2code: code,
        alpha3code: code_alpha_3,
        callingcodes__001: telephone,
        capital,
        region: continentName,
        subregion: subContinent,
        latlng: geocoords,
        demonym,
        area,
        timezones__001: timezone,
        nativename: nativeName,
        currencies__code: currencyCode,
        languages__iso639_1
      } = country;

      const continent = 'get_id_from contentName'
      const currency = 'get_id_from currencyCode'
      const language = 'get_id_from languages__iso639_1'

      countries.push({
        name,
        nativeName,
        demonym,
        area,
        domain,
        code,
        code_alpha_3,
        telephone,
        capital,
        continentName,
        continent,
        subContinent,
        geocoords,
        timezone,
        currency,
        language
      });
    });

    return { countries, data: list };
  }
}
