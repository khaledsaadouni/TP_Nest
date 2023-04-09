import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query
} from "@nestjs/common";
import { ToDoService } from './to-do.service';
import { TodoEntity } from './models/todo.entity';
import { TodoAddDto } from './models/dto/todoAddDto';
import { TodoUpdateDto } from './models/dto/todoUpdateDto';
import { UpdateResult } from 'typeorm';
import { CritereDto } from "./models/dto/critereDto";

@Controller('todo')
export class ToDoController {
  constructor(private todoService: ToDoService) {}
  @Get('/all')
  getTodos(): Promise<TodoEntity[]> {
    return this.todoService.getTodos();
  }
  @Get('/count')
  getTodo(): Promise<string> {
    return this.todoService.countByStatus();
  }
  @Get('/getQuery')
  async getTodoQuery1(@Query() queryParam: CritereDto) {
    return await this.todoService.getTodoQuery1(queryParam);
  }
  @Get('/getQuery2')
  async getTodoQuery2(@Query() queryParam: CritereDto) {
    return await this.todoService.getTodoQuery2(queryParam);
  }
  @Get('/:page/:take')
  async getTodosPaginated(@Param() params) {
    return await this.todoService.getTodosPaginated(params);
  }

  @Get('/:id')
  getTodoByID(@Param('id') id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }
  @Delete('/delete/:id')
  deleteTodoByID(@Param('id') id: number): Promise<UpdateResult> {
    return this.todoService.softDelete(id);
  }
  @Patch('/update/:id')
  updateTodoByID(
    @Param('id') id: number,
    @Body() td: TodoUpdateDto,
  ): Promise<UpdateResult> {
    return this.todoService.updateTodo(td, id);
  }
  @Post('/add')
  addTodo(@Body() todo: TodoAddDto): Promise<TodoEntity> {
    return this.todoService.addTodo(todo);
  }

  // @Get('/all')
  // getTodos(): TodoEntity[] {
  //   return this.todoService.getTodos();
  // }
  // @Get('/:id')
  // getTodoByID(@Param('id') id: string): TodoEntity {
  //   return this.todoService.getTodoByID(id);
  // }
  // @Delete('/delete/:id')
  // deleteTodoByID(@Param('id') id: string): TodoEntity[] {
  //   return this.todoService.deleteTodoByID(id);
  // }
  // @Patch('/update/:id')
  // updateTodoByID(@Param('id') id: string, @Body() td: TodoUpdateDto): TodoEntity[] {
  //   return this.todoService.updateTodoByID(id, td);
  // }
  // @Post('/add')
  // addTodo(@Body() todo: TodoAddDto): TodoEntity[] {
  //   return this.todoService.addTodo(todo);
  // }
}
