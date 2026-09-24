import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Mesa } from '../../mesas/mesa.entity';
import { PedidoPlato } from './pedido-plato.entity';

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  EN_PREPARACION = 'en_preparacion',
  LISTO = 'listo',
  ENTREGADO = 'entregado',
}

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: EstadoPedido.PENDIENTE,
  })
  estado: EstadoPedido;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @ManyToOne(() => Mesa, { eager: true, onDelete: 'CASCADE' })
  mesa: Mesa;

  @Column()
  mesaId: number;

  @OneToMany(() => PedidoPlato, (item) => item.pedido, { cascade: true })
  items: PedidoPlato[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}