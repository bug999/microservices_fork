import { Exclude } from 'class-transformer'; // 序列化
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user__mock_project', { name: 'mock项目和用户中间表' })
export class MockUserAndProjetOfRelation extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "bigint" })
  public userId?: number;

  @Column({ type: "bigint" })
  public projectId?: number;

  @UpdateDateColumn({ comment: '更新时间', name: "updated_at" })   // 自动生成并自动更新列
  updatedAt: string;

  @CreateDateColumn({ comment: '创建时间', name: "created_at" })  // 自动生成列
  createdAt: string;

  @Column({ type: "bigint", nullable: true, default: 1 })
  public status?: number;
}