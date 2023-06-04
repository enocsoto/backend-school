import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MateriaService {

  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async create(createMateriaDto: CreateMateriaDto) {
    const materia = this.materiaRepository.create(createMateriaDto);
    return await this.materiaRepository.save(materia);
  }

  async findAll() {
    return await this.materiaRepository.find();
  }

  async findOne(id: string) {
    const materia = await this.materiaRepository.findOne({where: {id}});
    if (!materia) {
      throw new NotFoundException('Materia not found');
    }
    return materia;
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto) {
    const materia = await this.findOne(id);
    this.materiaRepository.merge(materia, updateMateriaDto);
    return this.materiaRepository.save(materia);
  }

  async remove(id: string) {
    const materia = await this.findOne(id);
    await this.materiaRepository.remove(materia);
  }
}
