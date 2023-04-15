import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { TodoStatusEnum } from "../to-do/models/todo.entity";

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}
  create(createSkillDto) {
    return this.skillRepository.save(createSkillDto);
  }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return this.skillRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateSkillDto) {
    return this.skillRepository.update(id, {
      ...updateSkillDto,
    });
  }

  remove(id: number) {
    return this.skillRepository.delete(id);
  }
}
