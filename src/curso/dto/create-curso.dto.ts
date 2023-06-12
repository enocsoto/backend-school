import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto';
import { CreateMateriaDto } from 'src/materia/dto/create-materia.dto';

export class CreateCursoDto {
 
  @ApiProperty({ example: 'Nombre del curso', description: 'Nombre del curso', type: String })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ type: CreateMateriaDto })
  @ValidateNested()
  @Type(() => CreateMateriaDto)
  materia: CreateMateriaDto;

  @ApiProperty({ type: [CreateEstudianteDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateEstudianteDto)
  @IsArray()
  estudiantes: CreateEstudianteDto[];
}
