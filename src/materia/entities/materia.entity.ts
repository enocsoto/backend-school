import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  nombre: string;
  
  @Column('timestamp', { name: 'createdat', default: () => 'CURRENT_TIMESTAMP', })
  createdat: Date;

  @Column('timestamp', { name: 'updatedat', default: () => 'CURRENT_TIMESTAMP', })
  updatedat: Date;

  @OneToMany(() => Curso, curso => curso.materias, {cascade: true})
  curso: Curso[];
}
