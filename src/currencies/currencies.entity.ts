import { Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { CountryEntity } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CurrencyEntity extends BaseEntity  {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  number: number;

  @ApiProperty()
  @PrimaryGeneratedColumn()
  decimals: number;

  @ApiProperty({ type: () => [ CountryEntity ] })
  @OneToMany(type => CountryEntity, country => country.continent)
  countries: CurrencyEntity[];
}