import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudentRepository: Repository<Estudiante>,
  ) {}
  async create(createEstudianteDto: CreateEstudianteDto) {
    createEstudianteDto.name = createEstudianteDto.name.toLowerCase();
    createEstudianteDto.lastname = createEstudianteDto.lastname.toLowerCase();
    createEstudianteDto.email = createEstudianteDto.email.toLowerCase();
    createEstudianteDto.password = hashSync(createEstudianteDto.password, 8);
    createEstudianteDto.username = createEstudianteDto.username.toLowerCase();
    try {
      const estudiante: Estudiante =
        this.estudentRepository.create(createEstudianteDto);
      return await this.estudentRepository.save(estudiante);
    } catch (error) {
      throw new BadRequestException(`No se pudo crear el estudiante ` + error);
    }
  }

  async findAll() {
    try {
      return await this.estudentRepository.find();
    } catch (error) {
      throw new NotFoundException(`No hay Estudiantes en la BD `, error);
    }
  }

  async findOne(id: string) {
    const estudiante = await this.estudentRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante with ID ${id} not found`);
    }
    return estudiante;
  }

  async update(id: string, updateEstudianteDto: UpdateEstudianteDto) {
    updateEstudianteDto.name = updateEstudianteDto.name.toLowerCase();
    updateEstudianteDto.lastname = updateEstudianteDto.lastname.toLowerCase();
    updateEstudianteDto.email = updateEstudianteDto.email.toLowerCase();
    updateEstudianteDto.username = updateEstudianteDto.username.toLowerCase();

    try {
      const estudiante = await this.findOne(id);
      this.estudentRepository.merge(estudiante, updateEstudianteDto);
      return this.estudentRepository.save(estudiante);
    } catch (error) {
      throw new NotFoundException(`No se pudo actualizar el usuario`);
    }
  }

  async remove(id: string) {
    try {
      await this.estudentRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(
        `No se pudo Encontro el usuario con id ${id}`,
      );
    }
  }
}
