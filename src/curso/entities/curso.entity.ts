import { BaseEntity } from '../../common/config/base.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Materia } from '../../materia/entities/materia.entity';

import { Entity, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ICursos } from '../../interfaces/cursos.inteface';
import { EstudiantesCursosEntity } from '../../estudiante/entities/estudiantesCursos.entity';
import { EstudiantesCursosMateriasEntity } from '../../estudiante/entities/cursosMaterias.entity';

@Entity()
export class Curso extends BaseEntity implements ICursos {
  @Column()
  nombre_curso: string;

  @Column()
  description: string;

  @OneToMany(
    () => EstudiantesCursosEntity,
    (estudiantescursos) => estudiantescursos.cursos,
  )
  estudiantesIncluidos: EstudiantesCursosEntity[];

  @OneToMany(
    () => EstudiantesCursosMateriasEntity,
    (estudiantesMaterias) => estudiantesMaterias.curso,
  )
  estudiantesCursosMaterias: EstudiantesCursosMateriasEntity[];

  // @ManyToMany(() => Estudiante, (estudiante) => estudiante.curso)
  // estudiante: Estudiante[];

  @ManyToOne(() => Materia, (materia) => materia.cursos)
  materias: Materia;
}
