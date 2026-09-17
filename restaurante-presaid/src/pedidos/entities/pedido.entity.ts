import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Plato } from '../../platos/entities/plato.entity';
import { Mesa } from '../../mesas/mesa.entity';

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

  @ManyToMany(() => Plato, { eager: true })
  @JoinTable({
    name: 'pedido_platos',
    joinColumn: { name: 'pedidoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'platoId', referencedColumnName: 'id' },
  })
  platos: Plato[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}