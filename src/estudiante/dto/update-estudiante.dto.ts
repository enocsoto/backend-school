import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
    @ApiProperty({ example: 'John jas', description: 'Nuevo nombre del estudiante', required: false })
    @IsOptional()
    @IsString()
    name?: string;
  
    @ApiProperty({ example: 'Doe Do', description: 'Nuevo apellido del estudiante', required: false })
    @IsOptional()
    @IsString()
    lastname?: string;
  
    @ApiProperty({ example: 'newusername', description: 'Nuevo nombre de usuario del estudiante', required: false })
    @IsOptional()
    @IsString()
    username?: string;
  
    @ApiProperty({ example: 'newpassword', description: 'Nueva contraseña del estudiante', required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    password?: string;
  
    @ApiProperty({ example: 'newemail@example.com', description: 'Nuevo correo electrónico del estudiante', required: false })
    @IsOptional()
    @IsEmail()
    correo?: string;

}
