import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({
  name: 'tasks',
})
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    username: string;

  @Column()
    email: string;

  @Column({
    nullable: true,
  })
    description: string;

  @Column({
    default: false,
  })
    status: boolean;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.tasks)
    user: User;
}
