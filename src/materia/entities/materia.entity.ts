import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';
import { BaseEntity } from '../../common/config/base.entity';
import { IMateria } from '../../interfaces/materia.interface';
import { EstudiantesCursosMateriasEntity } from '../../estudiante/entities/cursosMaterias.entity';

@Entity()
export class Materia extends BaseEntity implements IMateria {
  @Column({ unique: true })
  nombre_materia: string;

  @OneToMany(
    () => EstudiantesCursosMateriasEntity,
    (estudianteCursoMateria) => estudianteCursoMateria.materia,
    { cascade: true, eager: true },
  )
  estudiantesCursosMaterias: EstudiantesCursosMateriasEntity[];

  @OneToMany(() => Curso, cursos => cursos.materias, {cascade: true, eager:true})
  cursos?: Curso[];
}
