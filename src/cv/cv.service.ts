import { Inject, Injectable } from "@nestjs/common";
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { TOKENS } from "../common/common.module";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "../to-do/models/todo.entity";
import { Repository } from "typeorm";
import { Cv } from "./entities/cv.entity";

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {}
  create(createDto) {
    return this.cvRepository.save(createDto);
  }

  findAll() {
    return this.cvRepository.find();
  }

  findOne(id: number) {
    return this.cvRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateDto) {
    return this.cvRepository.update(id, {
      ...updateDto,
    });
  }

  remove(id: number) {
    return this.cvRepository.delete(id);
  }
}
