import { Entity, OneToMany } from 'typeorm';
import { Country } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from '../_base/location.entity';

@Entity()
export class Continent extends LocationEntity  {
  @ApiProperty({ type: () => [ Country ] })
  @OneToMany(type => Country, country => country.continent)
  countries: Country[];
}