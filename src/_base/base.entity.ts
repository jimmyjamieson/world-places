import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500, unique: true })
  name!: string;

  @ApiProperty()
  @Column({ length: 500, unique: true })
  nativeName: string;

  @ApiProperty()
  @Column({ length: 20, unique: true })
  code: string;
}