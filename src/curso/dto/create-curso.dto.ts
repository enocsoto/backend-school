import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ example: 'Nombre del curso', description: 'Nombre del curso', type: String })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
