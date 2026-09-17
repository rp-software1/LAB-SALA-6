import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Plato } from '../../platos/entities/plato.entity';
import { Mesa } from '../../mesas/mesa.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Mesa, { eager: true, onDelete: 'CASCADE' })
  mesa: Mesa;

  @ManyToOne(() => Plato, { eager: true, onDelete: 'CASCADE' })
  plato: Plato;
}