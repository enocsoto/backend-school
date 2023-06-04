import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    try {
      createCursoDto.nombre = createCursoDto.nombre.toLowerCase();
      const curso = this.cursoRepository.create(createCursoDto);
      return await this.cursoRepository.save(curso);
    } catch (error) {
      throw new BadRequestException(`No se pudo crear el Curso`);
    }
  }

  findAll() {
    try {
      return this.cursoRepository.find();
    } catch (error) {
      throw new NotFoundException(`Not Found Cursos in BD`);
    }
  }

  async findOne(id: string): Promise<Curso> {
    try {
      const curso = await this.cursoRepository.findOne({ where: { id } });
      if (!curso) throw new NotFoundException(`Curso not Found`);
      return curso;
    } catch (error) {
      throw new NotFoundException(`Curso whit id: ${id} Not Found`);
    }
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    try {
      const curso = await this.findOne(id);
      Object.assign(curso, updateCursoDto);
      return this.cursoRepository.save(curso);
    } catch (error) {
      throw new NotFoundException(`Curso whit id: ${id} Not Found `, error);
    }
  }

  async remove(id: string) {
    try {
      const curso = await this.findOne(id);
      await this.cursoRepository.remove(curso);
    } catch (error) {
      throw new BadRequestException(`Curso with id: "${id}" not found`);
    }
  }
}
