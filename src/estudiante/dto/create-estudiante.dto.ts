import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsNotEmpty, ValidateNested, MaxLength, IsUUID, } from 'class-validator';
import { CreateCursoDto } from 'src/curso/dto/create-curso.dto';

export class CreateEstudianteDto {
  @ApiProperty({ example: 'e6e449d5-848d-4b2e-b8c0-2d6f8a37a12a' })
  @IsUUID()  
  id: string;

  @ApiProperty({ example: 'John', description: 'Nombre del estudiante' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del estudiante' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({ example: '1234567890', description: 'documento de identidad del estudiante' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  documento: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Correo electrónico del estudiante' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
 
  @ApiProperty({ type: [CreateCursoDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateCursoDto)
  cursos: CreateCursoDto[];
  
  // @ApiProperty({ example: 'a1ec2092-3dc4-4d2b-b779-8b2d72bc12cc', description: 'Id del curso al cual pertenece el Estudiante' })
  // @IsNotEmpty()
  // @IsUUID()
  // curso: string;
}
