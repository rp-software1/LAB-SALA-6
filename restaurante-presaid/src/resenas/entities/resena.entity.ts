import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plato } from '../../platos/entities/plato.entity';

@Entity('resenas')
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calificacion: number;

  @Column()
  comentario: string;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Plato, (plato) => plato.resenas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  plato: Plato;
}