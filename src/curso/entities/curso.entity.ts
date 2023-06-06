import { Estudiante } from '../../estudiante/entities/estudiante.entity'
import { Materia } from '../../materia/entities/materia.entity'

import { Entity, Column, OneToMany, Index, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  nombre: string;

  @Column('timestamp', { name: 'createdat', default: () => 'CURRENT_TIMESTAMP', })
  createdat: Date;

  @Column('timestamp', { name: 'updatedat', default: () => 'CURRENT_TIMESTAMP', })
  updatedat: Date;
  
  @ManyToMany(() => Estudiante, (estudiante) => estudiante.curso)
  estudiante: Estudiante;

  @OneToMany(() => Materia, (materia) => materia.curso)
  materias: Materia[];
}
