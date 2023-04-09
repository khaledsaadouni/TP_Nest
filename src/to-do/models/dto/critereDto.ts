import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../todo.entity';

export class CritereDto {
  @IsOptional()
  data: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  public status: TodoStatusEnum;
}
