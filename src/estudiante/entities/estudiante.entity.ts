import { Entity, Column, Index, JoinColumn, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';
import { BaseEntity } from '../../common/config/base.entity';
import { IEstudiante } from '../../interfaces/estudiante.interface';
import { ROLES } from '../../common/config/roles.enum';
import { EstudiantesCursosEntity } from './estudiantesCursos.entity';
import { EstudiantesCursosMateriasEntity } from './cursosMaterias.entity';

@Entity()
export class Estudiante extends BaseEntity implements IEstudiante{
  
  @Column('varchar', { name: 'name', length: 50 })
  name: string;
  
  @Column('varchar', { name: 'lastname', length: 255 })
  lastname: string;
  
  @Column('varchar', { name: 'documento', length: 50 })
  documento: string;
  
  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;
  
  @Column({type: 'enum', enum: ROLES})
  role: ROLES;
  
  @Index()
  @Column()
  cursoId: string;

  @OneToMany(()=> EstudiantesCursosEntity, (estudiantesCursos) => estudiantesCursos.estudiante)
  cursosIncluidos: EstudiantesCursosEntity[];

  @OneToMany(()=> EstudiantesCursosMateriasEntity, (estudianteMateria)=> estudianteMateria.estudiante)
  estudiantesCursosMaterias: EstudiantesCursosMateriasEntity[];
  

  // @ManyToMany(() => Curso, curso => curso.estudiante, {cascade: true})
  // curso: Curso[];Estudiantes
  
}
