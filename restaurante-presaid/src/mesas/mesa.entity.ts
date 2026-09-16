import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EstadoMesa {
  DISPONIBLE = 'DISPONIBLE',
  OCUPADA = 'OCUPADA',
  RESERVADA = 'RESERVADA',
}

@Entity('mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numero: number;

  @Column()
  capacidad: number;

  @Column({
    type: 'simple-enum',
    enum: EstadoMesa,
    default: EstadoMesa.DISPONIBLE,
  })
  estado: EstadoMesa;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
