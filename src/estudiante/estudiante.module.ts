import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Curso } from '../curso/entities/curso.entity';
import { Materia } from '../materia/entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
