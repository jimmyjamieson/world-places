import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Continent } from '../continents/continent.entity';
import { Currency } from '../currencies/currencies.entity';
import { LocationEntity } from '../_base/location.entity';
import { Language } from '../languages/languages.entity';
import { Region } from '../regions/region.entity';

@Entity()
export class Country extends LocationEntity  {
  @ApiProperty({ type: () => Continent })
  @ManyToOne(type => Continent, continent => continent.countries)
  continent: Continent;

  @ApiProperty({ type: () => [ Region ] })
  @OneToMany(type => Region, region => region.country)
  regions: Region[];

  @ApiProperty({ type: () => Currency })
  @ManyToOne(type => Currency, currency => currency.countries)
  currency: Currency;

  @ApiProperty({ type: () => Language })
  @ManyToOne(type => Language, language => language.countries)
  language: Language;
}