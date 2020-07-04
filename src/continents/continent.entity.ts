import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ContinentEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  name!: string;

  @ApiProperty()
  @Column({ length: 20 })
  code!: string;

  @ApiProperty()
  @Column({ length: 500 })
  nativeName!: string;
}