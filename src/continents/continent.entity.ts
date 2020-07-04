import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContinentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  nativeName: string;

  @Column('text')
  description: string;
}