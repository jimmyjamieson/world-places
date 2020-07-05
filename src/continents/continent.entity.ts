import { Entity, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { CountryEntity } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ContinentEntity extends BaseEntity  {
  @ApiProperty({ type: () => [ CountryEntity ] })
  @OneToMany(type => CountryEntity, country => country.continent)
  countries: CountryEntity[];
}