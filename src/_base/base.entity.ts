import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  name!: string;

  @ApiProperty()
  @Column({ length: 500 })
  nativeName: string;

  @ApiProperty()
  @Column({ length: 20, nullable: true })
  code: string;
}