import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mesa } from '../../mesas/mesa.entity';

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
}

export enum EstadoTicket {
  ABIERTO = 'abierto',
  PAGADO = 'pagado',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mesa_id' })
  mesaId: number;

  @ManyToOne(() => Mesa, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'mesa_id' })
  mesa: Mesa;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'simple-enum',
    enum: MetodoPago,
    nullable: true,
  })
  metodoPago: MetodoPago | null;

  @Column({
    type: 'simple-enum',
    enum: EstadoTicket,
    default: EstadoTicket.ABIERTO,
  })
  estado: EstadoTicket;

  @CreateDateColumn()
  createdAt: Date;
}