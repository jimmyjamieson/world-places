import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../currencies/currencies.entity';
import { LocationEntity } from '../_base/location.entity';
import { Language } from '../languages/languages.entity';
import { Region } from '../regions/region.entity';

@Entity()
export class Country extends LocationEntity {
  @ApiProperty()
  @Column({ length: 255, nullable: true })
  continent: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  subContinent: string;

  @ApiProperty({ type: () => [Region] })
  @OneToMany(
    type => Region,
    region => region.country,
    { cascade: true, onDelete: 'CASCADE' },
  )
  regions: Region[];

  @ApiProperty({ type: () => Currency })
  @ManyToOne(
    type => Currency,
    currency => currency.countries,
    { cascade: true, onDelete: 'CASCADE' },
  )
  currency: Currency;

  @ApiProperty()
  @Column({ nullable: true })
  currencyId: string;

  @ApiProperty({ type: () => Language })
  @ManyToOne(
    type => Language,
    language => language.countries,
    { cascade: true, onDelete: 'CASCADE' },
  )
  language: Language;

  @ApiProperty()
  @Column({ nullable: true })
  languageId: string;
}
