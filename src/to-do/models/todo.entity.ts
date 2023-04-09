import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimeStamp } from '../../generic/TimeStamp.entity';

export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}
@Entity()
export class TodoEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  public status: TodoStatusEnum;
  @Column()
  public name: string;
  @Column()
  public description: string;
}
