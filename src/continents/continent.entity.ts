import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { CountryEntity } from '../countries/country.entity';

@Entity()
export class ContinentEntity extends BaseEntity  {
  @OneToMany(type => CountryEntity, country => country.continent)
  countries: CountryEntity[];
}