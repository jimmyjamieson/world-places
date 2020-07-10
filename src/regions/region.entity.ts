import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Country } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationEntity } from '../_base/location.entity';
import { City } from '../cities/cities.entity';

@Entity()
export class Region extends LocationEntity  {

  @ApiProperty({ type: () => Country })
  @ManyToOne(type => Country, country => country.regions)
  country: Country;

  @ApiProperty()
  countryCode: string;

  @ApiProperty({ type: () => [ City ] })
  @OneToMany(type => City, city => city.region)
  cities: City[];

}