import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

export enum EstadoComanda {
  RECIBIDA = 'recibida',
  EN_PREPARACION = 'en_preparacion',
  LISTA = 'lista',
}

@Entity('comandas')
export class Comanda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pedido_id' })
  pedidoId: number;

  @ManyToOne(() => Pedido, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @Column({
    type: 'varchar',
    default: EstadoComanda.RECIBIDA,
  })
  estado: EstadoComanda;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}