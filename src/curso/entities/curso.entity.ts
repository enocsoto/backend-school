import { Estudiante } from '../../estudiante/entities/estudiante.entity'
import { Materia } from '../../materia/entities/materia.entity'

import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  nombre_curso: string;

  @Column('timestamp', { name: 'createdat', default: () => 'CURRENT_TIMESTAMP', })
  createdat: Date;

  @Column('timestamp', { name: 'updatedat', default: () => 'CURRENT_TIMESTAMP', })
  updatedat: Date;
  
  @ManyToMany(() => Estudiante, (estudiante) => estudiante.curso)
  estudiante: Estudiante[];

  @ManyToOne(() => Materia, materia => materia.cursos)
  materias: Materia;
}
