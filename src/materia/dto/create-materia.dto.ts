import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMateriaDto {
  @ApiProperty({ example: 'Nombre de la materia', description: 'Nombre de la materia', type: String })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'a1ec2092-3dc4-4d2b-b779-8b2d72bc12cc', description: 'ID del curso al que pertenece la materia (UUID)', type: String, format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  cursoId: string;  
}
