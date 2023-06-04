import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateEstudianteDto {
  @ApiProperty({ example: 'John', description: 'Nombre del estudiante' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del estudiante' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'johndoe', description: 'Nombre de usuario del estudiante' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '12345678', description: 'Contraseña del estudiante' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Correo electrónico del estudiante' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
 
  @ApiProperty({ example: 'nombre del curso', description: 'Nombre del curso' })
  @IsNotEmpty()
  @IsString()
  nombreCurso: string;
  
  @ApiProperty({ example: 'a1ec2092-3dc4-4d2b-b779-8b2d72bc12cc', description: 'Id del curso al cual pertenece el Estudiante' })
  @IsNotEmpty()
  @IsUUID()
  cursoId: string;
}
