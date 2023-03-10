import { Exclude } from 'class-transformer'; // 序列化
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ type: 'varchar' })
  public email?: string;

  @Column({ type: 'varchar' })
  public mobile: string;

  @Column({ type: 'varchar' })
  public userName?: string;

  @Column({ type: "bigint" })
  public status?: number;

  @Column({ type: "datetime" })
  public createTime?: string;

  @Exclude() // 过滤掉
  @Column({ type: "varchar" })
  public salt?: number;

  @Exclude() // 过滤掉密码
  @Column({ type: 'varchar' })
  public password: string;

  
}