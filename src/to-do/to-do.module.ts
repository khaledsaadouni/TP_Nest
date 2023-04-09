import { Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './models/todo.entity';

@Module({
  controllers: [ToDoController],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [ToDoService],
})
export class ToDoModule {}
