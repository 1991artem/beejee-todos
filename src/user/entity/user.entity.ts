import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_ROLE } from 'user/constants';
import { Task } from '../../task/entity/task.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    password: string;

  @Column({
    unique: true,
  })
    name: string;

  @Column({
    type: "enum",
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
    role: USER_ROLE;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @OneToMany(() => Task, (task: Task) => task.user, { eager: true, cascade: true })
    tasks: Task[];
}
