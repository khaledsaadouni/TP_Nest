import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../../generic/TimeStamp.entity';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('user')
export class User extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Cv, (cv: Cv) => cv.user)
  cvs: Cv[];
}
