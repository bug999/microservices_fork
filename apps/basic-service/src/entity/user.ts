import { Exclude } from 'class-transformer'; // 序列化
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: true, })
  public email?: string;

  @Column({ type: 'varchar' })
  public mobile: string;

  @Column({ type: 'varchar', name: 'user_name', nullable: true, })
  public userName?: string;

  @Column({ type: "bigint", nullable: true, })
  public status?: number;

  @UpdateDateColumn({ comment: '更新时间' })   // 自动生成并自动更新列
  updatedAt: string;

  @CreateDateColumn({ comment: '创建时间' })  // 自动生成列
  createdAt: string;

  @Exclude() // 过滤掉
  @Column({ type: "varchar" })
  public salt?: string;

  @Exclude() // 过滤掉密码
  @Column({ type: 'varchar' })
  public password: string;


}