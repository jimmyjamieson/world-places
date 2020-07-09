import { Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Continent } from '../continents/continent.entity';
import { Currency } from '../currencies/currencies.entity';
import { LocationEntity } from '../_base/location.entity';

@Entity()
export class Country extends LocationEntity  {
  @ApiProperty({ type: () => Continent })
  @ManyToOne(type => Continent, continent => continent.countries)
  continent: Continent;

  @ApiProperty({ type: () => Currency })
  @ManyToOne(type => Currency, currency => currency.countries)
  currency: Currency;
}