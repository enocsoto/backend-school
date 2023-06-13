import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column({unique: true})
  nombre_materia: string;
  
  @Column('timestamp', { name: 'createdat', default: () => 'CURRENT_TIMESTAMP', })
  createdat: Date;

  @Column('timestamp', { name: 'updatedat', default: () => 'CURRENT_TIMESTAMP', })
  updatedat: Date;

  @OneToMany(() => Curso, cursos => cursos.materias, {cascade: true})
  cursos?: Curso[];
}
