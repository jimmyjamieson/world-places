import { Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../_base/base.entity';
import { ContinentEntity } from '../continents/continent.entity';

@Entity()
export class CountryEntity extends BaseEntity  {
  @ApiProperty()
  @ManyToOne(type => ContinentEntity, continent => continent.countries)
  continent: ContinentEntity;
}