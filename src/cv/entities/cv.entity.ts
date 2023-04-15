import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Skill } from '../../skill/entities/skill.entity';
import { TimeStamp } from '../../generic/TimeStamp.entity';
import { User } from '../../user/models/user.entity';
@Entity('cv')
export class Cv extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
  })
  name: string;
  @Column({
    length: 50,
  })
  firstname: string;
  @Column({
    length: 50,
  })
  job: string;
  @Column({
    length: 50,
  })
  path: string;
  @Column({
    length: 50,
  })
  cin: string;
  @Column()
  age: number;
  @ManyToOne(() => User, (user: User) => user.cvs, { eager: true })
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.cvs, {})
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
