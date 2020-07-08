import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { CountryEntity } from '../countries/country.entity';
import removeUnicode from '../utils/remove-unicode';
import {getManager} from "typeorm";
import { CountriesService } from '../countries/countries.service';
import { ContinentsService } from '../continents/continents.service';
import { CurrencyEntity } from '../currencies/currencies.entity';
import { CurrenciesService } from '../currencies/currencies.service';

@Injectable()
export class ImportService {
  constructor(
    private readonly csvParser: CsvParser,
    private readonly countriesService: CountriesService,
    private readonly continentsService: ContinentsService,
    private readonly currenciesService: CurrenciesService,
  ) {}

  entityManager = getManager();

  async importFile(entity, file) {
    const stream = await createReadStream(file);
    const csv: ParsedData<any> = await this.csvParser.parse(
      stream,
      entity,
      null,
      null,
      {
        strict: true,
        separator: ',',
        mapHeaders: ({ header, index }) => header.toLowerCase(),
      },
    );
    return csv;
  }

  async importCurrencies() {
    const csv = await this.importFile(CurrencyEntity, 'import/currencies.csv');
    const { list } = csv;

    const currencies = await Promise.all(
      list.map(async currency => {
        const { name, code, number, decimals } = currency;

        return {
          name,
          nativeName: name,
          code,
          number,
          decimals,
        };
      }),
    );

    await Promise.all(
      currencies.map(async currency => {
        try {
          const cur = await this.entityManager.save(CurrencyEntity, currency)
        }catch (e) {
          console.log('error', e)
        }
      }),
    );

    return currencies;
  }

  async importCountries() {
    const csv = await this.importFile(CountryEntity, 'import/countries.csv');
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
    const currencies = await this.importCurrencies();
    // const countries = await this.importCountries()
    return { imported: { currencies } };
  }
}
