import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto';
import { CreateMateriaDto } from 'src/materia/dto/create-materia.dto';

export class CreateCursoDto {
  @ApiProperty({ example: 'c9a0f1dc-3f11-4d11-9c0a-586d315d6797' })
  @IsUUID()
  id: string;

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
  estudiantes: CreateEstudianteDto[];
}
