import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMateriaDto } from './create-materia.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {
  @ApiProperty({ example: 'Nuevo nombre de la materia', required: false })
  @IsOptional()
  @IsString()
  nombre_materia?: string;
}
