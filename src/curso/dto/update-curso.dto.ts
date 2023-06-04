import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
  @ApiProperty({ example: 'Nuevo nombre del curso', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;
}
