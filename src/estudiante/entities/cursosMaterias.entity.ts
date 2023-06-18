import { Column, Entity, ManyToOne } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Curso } from "../../curso/entities/curso.entity";

import { ACCESS_LEVEL } from "../../common/config/roles.enum";
import { BaseEntity } from "../../common/config/base.entity";
import { Materia } from "../../materia/entities/materia.entity";

@Entity({ name: 'estudiantes_cursos_materias' })
export class EstudiantesCursosMateriasEntity extends BaseEntity {
   @Column({ type: 'enum', enum: ACCESS_LEVEL })
    accessLevel: ACCESS_LEVEL;
    
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.estudiantesCursosMaterias)
    estudiante: Estudiante;

    @ManyToOne(() => Curso, (curso) => curso.estudiantesCursosMaterias)
    curso: Curso;

    @ManyToOne(() => Materia, (materia) => materia.estudiantesCursosMaterias)
    materia: Materia;
}
