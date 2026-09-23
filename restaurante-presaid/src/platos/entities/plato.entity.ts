import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Resena } from '../../resenas/entities/resena.entity';

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

  @OneToMany(() => Resena, (resena) => resena.plato)
  resenas: Resena[];
}