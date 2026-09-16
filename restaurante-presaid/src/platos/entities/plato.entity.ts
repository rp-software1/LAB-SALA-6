import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nombre: string;

  @Column('decimal', { precision: 6, scale: 2 })
  precio: number;

  @Column({ nullable: true })
  descripcion: string;
}