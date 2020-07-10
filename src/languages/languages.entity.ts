import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Country } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Language extends BaseEntity  {

  @ApiProperty({ type: () => [ Country ] })
  @OneToMany(type => Country, country => country.language)
  countries: Country[];

  @ApiProperty()
  @Column({ length: 10, nullable: true })
  code_iso_3: string;
}