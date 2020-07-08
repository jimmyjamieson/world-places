import { Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ContinentEntity } from '../continents/continent.entity';
import { CurrencyEntity } from '../currencies/currencies.entity';
import { LocationEntity } from '../_base/location.entity';

@Entity()
export class CountryEntity extends LocationEntity  {
  @ApiProperty({ type: () => ContinentEntity })
  @ManyToOne(type => ContinentEntity, continent => continent.countries)
  continent: ContinentEntity;

  @ApiProperty({ type: () => CurrencyEntity })
  @ManyToOne(type => CurrencyEntity, currency => currency.countries)
  currency: CurrencyEntity;
}