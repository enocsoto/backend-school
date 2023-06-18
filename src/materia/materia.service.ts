import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    private readonly dataSource : DataSource,
  ) {}

  async create(createMateriaDto: CreateMateriaDto) {
    try {
      const { cursos = [], ...MateriaDetails } = createMateriaDto;
      const materia = this.materiaRepository.create({
        ...MateriaDetails,
        //cursos: cursos.map((nombre_curso) =>
          //this.cursoRepository.create({ nombre_curso: nombre_curso }),
      //  ),
      });
      await this.materiaRepository.save(materia);
      return { ...materia, nombre_cursos: cursos };

      // const materia = this.materiaRepository.create(createMateriaDto);
      // await this.materiaRepository.save(materia);
      // return materia;
    } catch (error) {
      throw new BadRequestException(
        `Error creating the subject, the name ${createMateriaDto.nombre_materia} it already create`,
        error,
      );
    }
  }

  async findAll(): Promise<Materia[]> {
    try {
      const materias = await this.materiaRepository.find({
        relations: {
          //cursos: true,
        },
      });
      return materias;
    } catch (error) {
      throw new NotFoundException(`Error subjects not Found`);
    }
  }

  async findOne(id: string): Promise<Materia> {
    try {
      const materia = await this.materiaRepository.findOne({ where: { id } });
      if (!materia) {
        throw new NotFoundException(`Error Subject whit id: ${id} not found`);
      }
      return materia;
    } catch (error) {
      throw new BadRequestException(`Error retrieving the Subject`);
    }
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto) {
    const { cursos, ...toUpdate } = updateMateriaDto;

    const materia = await this.materiaRepository.preload({ id, ...toUpdate });
    if (!materia) throw new NotFoundException(`Subject whit id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();// corre el queryRunner
    await queryRunner.startTransaction(); //inician las transacciones a la base de datos

    try {
 
      if(cursos){
        await queryRunner.manager.softDelete( Curso, {cursos: {id}})
        cursos
      }
      await this.materiaRepository.save(materia);
      return materia;
      // const materia = await this.findOne(id);
      // this.materiaRepository.merge(materia, updateMateriaDto);
      // return this.materiaRepository.save(materia);
    } catch (error) {
      throw new BadRequestException(
        `Error updating the Subject with id: ${id}`,
      );
    }
  }

  async remove(id: string): Promise<String> {
    try {
      const materia = await this.findOne(id);
      await this.materiaRepository.remove(materia);
      return `Subject with id: ${id} has deleted`;
    } catch (error) {
      throw new NotFoundException(`Error Subject with id: ${id} not found`);
    }
  }
}
