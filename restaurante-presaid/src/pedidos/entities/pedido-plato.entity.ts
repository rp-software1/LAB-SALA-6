import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plato } from '../../platos/entities/plato.entity';
import { Pedido } from './pedido.entity';

@Entity('pedido_platos')
export class PedidoPlato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido;

  @ManyToOne(() => Plato, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'platoId' })
  plato: Plato;

  @Column()
  cantidad: number;
}
