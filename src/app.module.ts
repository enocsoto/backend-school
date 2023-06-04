import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './common/config/data-source';
import { MateriaModule } from './materia/materia.module';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({...dataSourceOptions}),

    EstudianteModule,

    MateriaModule,

    CursoModule],
})
export class AppModule {}
