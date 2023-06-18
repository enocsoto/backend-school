import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { CreateCursoDto } from 'src/curso/dto/create-curso.dto';

export class CreateMateriaDto {
 
  @ApiProperty({ example: 'Node JS', description: 'Nombre de la materia', type: String })
  @IsString()
  @IsNotEmpty()
  nombre_materia: string;

  @ApiProperty({ example: ['Programacion'], description: 'Nombre del curso', type: Array })
  @IsString({each:true})
  @IsArray()
  @IsOptional()
  cursos?: string[];


}
