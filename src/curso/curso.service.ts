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

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    try {
      createCursoDto.nombre = createCursoDto.nombre.toLowerCase();
      const curso = this.cursoRepository.create(createCursoDto);
      return await this.cursoRepository.save(curso);
    } catch (error) {
      throw new BadRequestException(`Error creating the Course`);
    }
  }

  findAll(): Promise<Curso[]> {
    try {
      return this.cursoRepository.find();
    } catch (error) {
      throw new NotFoundException(`Not found Course in BD`);
    }
  }

  async findOne(id: string): Promise<Curso> {
    try {
      const curso = await this.cursoRepository.findOne({ where: { id } });
      if (!curso) throw new NotFoundException(`Course not found`);
      return curso;
    } catch (error) {
      throw new NotFoundException(`Course whit id: ${id} not found`);
    }
  }

  async update(id: string, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    try {
      const curso = await this.findOne(id);
      Object.assign(curso, updateCursoDto);
      return this.cursoRepository.save(curso);
    } catch (error) {
      throw new NotFoundException(`Course whit id: ${id} not found `, error);
    }
  }

  async remove(id: string):Promise<String>{
    try {
      const curso = await this.findOne(id);
      await this.cursoRepository.remove(curso);
      return `Course with ${id} has deleted`;
    } catch (error) {
      throw new BadRequestException(`Course with id: "${id}" not found`);
    }
  }
}
