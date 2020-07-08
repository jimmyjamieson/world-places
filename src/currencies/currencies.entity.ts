import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { CountryEntity } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CurrencyEntity extends BaseEntity  {

  @ApiProperty()
  number: number;

  @ApiProperty()
  decimals: number;

  @ApiProperty()
  symbol: string;

  @ApiProperty({ type: () => [ CountryEntity ] })
  @OneToMany(type => CountryEntity, country => country.continent)
  countries: CurrencyEntity[];
}