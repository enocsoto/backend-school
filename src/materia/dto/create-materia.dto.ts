import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { CreateCursoDto } from 'src/curso/dto/create-curso.dto';

export class CreateMateriaDto {
 
  @ApiProperty({ example: 'Node JS', description: 'Nombre de la materia', type: String })
  @IsString()
  @IsNotEmpty()
  nombre_materia: string;

}
