import { Entity, Column, Index, JoinColumn, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;
  
  @Column('varchar', { name: 'lastname', length: 255 })
  lastname: string;
  
  @Column('varchar', { name: 'documento', length: 50 })
  documento: string;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;
  
  @Column()
  @Index()
  cursoId: string;

  @Column('timestamp', { name: 'createdat', default: () => 'CURRENT_TIMESTAMP', })
  createdat: Date;

  @Column('timestamp', { name: 'updatedat', default: () => 'CURRENT_TIMESTAMP', })
  updatedat: Date;

  @ManyToMany(() => Curso, curso => curso.estudiante, {cascade: true})
  curso: Curso[];

}
