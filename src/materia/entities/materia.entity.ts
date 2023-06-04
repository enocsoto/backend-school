import { Entity, Column, ManyToOne, Index, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Curso, curso => curso.materias)
  curso: Curso;
}
