import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  nombreCliente: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Plato, (plato) => plato.resenas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'platoId' })
  plato: Plato;
}