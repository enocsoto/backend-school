import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Curso, Materia, Estudiante])],
  controllers: [CursoController],
  providers: [CursoService]
})
export class CursoModule {}
