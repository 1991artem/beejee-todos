import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    isdone: boolean;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
