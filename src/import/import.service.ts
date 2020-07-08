import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { CountryEntity } from '../countries/country.entity';
import removeUnicode from '../utils/remove-unicode';
import { CountriesService } from '../countries/countries.service';
import { ContinentsService } from '../continents/continents.service';

@Injectable()
export class ImportService {
  constructor(
    private readonly csvParser: CsvParser,
    private readonly countriesService: CountriesService,
    private readonly continentsService: ContinentsService,
  ) {}

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

    const list = await removeUnicode(csv.list); // TODO: Fix unicode name issue

    return await Promise.all(
      list.map(async country => {
        const name = country[Object.keys(country)[0]]; // TODO: weird fix until unicode removal works for that extra space
        const {
          nativename: nativeName,
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
          currencies__code: currencyCode,
          languages__iso639_1,
        } = await country;

        const continent = await this.continentsService.findOne({
          where: {
            name: continentName,
          },
        });

        return {
          name,
          nativeName,
          demonym,
          code,
          code_alpha_3,
          area,
          capital,
          telephone,
          timezone,
          domain,
          continent: continent?.id,
          subContinent,
        };
      }),
    );

  }

  async importAll() {
    const countries = await this.importCountries()
    return { imported: { countries } }
  }

}
