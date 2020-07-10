import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Country } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Currency extends BaseEntity  {

  @ApiProperty()
  number: number;

  @ApiProperty()
  decimals: number;

  @ApiProperty()
  symbol: string;

  @ApiProperty({ type: () => [ Country ] })
  @OneToMany(type => Country, country => country.currency)
  countries: Country[];
}