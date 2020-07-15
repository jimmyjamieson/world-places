import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../_base/base.entity';
import { Country } from '../countries/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Currency extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: true })
  number: string;

  @ApiProperty()
  @Column({ nullable: true })
  decimals: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  symbol: string;

  @ApiProperty({ type: () => [Country] })
  @OneToMany(
    type => Country,
    country => country.currency,
  )
  countries: Country[];
}
