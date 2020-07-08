import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class LocationEntity extends BaseEntity  {
  @ApiProperty()
  @Column({ nullable: true })
  coords: string;
}