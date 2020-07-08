import { Entity, OneToMany } from 'typeorm';
import { CountryEntity } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from '../_base/location.entity';

@Entity()
export class ContinentEntity extends LocationEntity  {
  @ApiProperty({ type: () => [ CountryEntity ] })
  @OneToMany(type => CountryEntity, country => country.continent)
  countries: CountryEntity[];
}