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

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudentRepository: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudentRepository.create(createEstudianteDto);
      await this.estudentRepository.save(estudiante);
      return estudiante;
    } catch (error) {
      throw new BadRequestException(` Error creating the student ` + error);
    }
  }

  async findAll(): Promise<Estudiante[]> {
    try {
      const estudiantes = await this.estudentRepository.find();
      return estudiantes;
    } catch (error) {
      throw new NotFoundException(` Estudents not Found en BD `, error);
    }
  }

  async findOne(id: string): Promise<Estudiante> {
    try {
      const estudiante = await this.estudentRepository.findOne({
        where: { id },
      });
      return estudiante;
    } catch (error) {
      throw new NotFoundException(` Estudent with ID ${id} not found `);
    }
  }

  async update(
    id: string,
    updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<Estudiante> {
    updateEstudianteDto.email = updateEstudianteDto.email.toLowerCase();

    try {
      const estudiante = await this.findOne(id);
      this.estudentRepository.merge(estudiante, updateEstudianteDto);
      return this.estudentRepository.save(estudiante);
    } catch (error) {
      throw new NotFoundException(` Error updating the student `);
    }
  }

  async remove(id: string): Promise<String> {
    try {
      await this.estudentRepository.delete(id);
      return `Estudent with id: ${id} deleted`;
    } catch (error) {
      throw new NotFoundException(` Student whit id ${id} not found `);
    }
  }
}
