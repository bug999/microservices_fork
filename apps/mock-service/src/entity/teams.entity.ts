import { Exclude } from 'class-transformer'; // 序列化
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('mock_teams', { name: 'mock项目下的组' })
export class MockTeams extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "bigint", nullable: true, })
  public createrId?: number;

  @Column({ type: "bigint", nullable: true, })
  public projectId?: number;

  @Column({ type: 'varchar', nullable: true, })
  public name?: string;

  @Column({ type: "varchar" })
  public desc?: string;

  @UpdateDateColumn({ comment: '更新时间', name: "updated_at" })   // 自动生成并自动更新列
  updatedAt: string;

  @CreateDateColumn({ comment: '创建时间', name: "created_at" })  // 自动生成列
  createdAt: string;

  @Column({ type: "bigint", nullable: true, default: 1 })
  public status?: number;
}