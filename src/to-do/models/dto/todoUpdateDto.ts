import { TodoStatusEnum } from '../todo.entity';
import { TodoAddDto } from './todoAddDto';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
export class TodoUpdateDto extends PartialType(TodoAddDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  public status: TodoStatusEnum;
}
