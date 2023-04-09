import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoAddDto } from './models/dto/todoAddDto';
import { TodoEntity, TodoStatusEnum } from './models/todo.entity';
import { TodoUpdateDto } from './models/dto/todoUpdateDto';
import { TOKENS } from '../common/common.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CritereDto } from './models/dto/critereDto';

@Injectable()
export class ToDoService {
  private ToDos: TodoEntity[] = [];
  constructor(
    @Inject(TOKENS.uuid) private randomID,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  // getTodos(): Todo[] {
  //   return this.ToDos;
  // }
  //
  // getTodoByID(id: string): Todo {
  //   const todo = this.ToDos.find((todo) => todo.id == id);
  //   if (todo == null) {
  //     throw NotFoundException;
  //   }
  //   return todo;
  // }
  // deleteTodoByID(id: string): Todo[] {
  //   const todo = this.ToDos.find((todo) => todo.id == id);
  //   if (todo == null) {
  //     throw NotFoundException;
  //   }
  //   const i = this.ToDos.indexOf(todo);
  //   if (i > -1) {
  //     this.ToDos.splice(i, 1);
  //   }
  //   return this.ToDos;
  // }
  // updateTodoByID(id: string, td: TodoUpdateDto): Todo[] {
  //   const tdo = this.ToDos.find((todo) => todo.id == id);
  //   if (tdo == null) {
  //     throw NotFoundException;
  //   }
  //   const i = this.ToDos.indexOf(tdo);
  //   if (td.name) {
  //     this.ToDos[i].name = td.name;
  //   }
  //   if (td.description) {
  //     this.ToDos[i].description = td.description;
  //   }
  //   if (td.status) {
  //     this.ToDos[i].status = TodoStatusEnum[td.status];
  //   }
  //   this.ToDos[i] = tdo;
  //   return this.ToDos;
  // }
  //this.ToDos.length != 0 ? this.ToDos[this.ToDos.length - 1].id + 1 : 1
  // addTodo(todo: TodoAddDto): Todo[] {
  //   const td = new Todo();
  //   td.status = TodoStatusEnum.waiting;
  //   td.name = todo.name;
  //   td.description = todo.description;
  //   td.createdAt = new Date();
  //   this.ToDos.push(td);
  //   return this.ToDos;
  // }
  getTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  getTodoById(id: number): Promise<TodoEntity> {
    const todo = this.todoRepository.findOne({
      where: {
        id: id,
      },
    });

    if (todo) {
      return todo;
    }
    throw new NotFoundException('Todo inexistant');
  }
  addTodo(addTodo: TodoAddDto): Promise<TodoEntity> {
    return this.todoRepository.save(addTodo);
  }
  async updateTodo(todoDto: TodoUpdateDto, id: number): Promise<UpdateResult> {
    return this.todoRepository.update(id, {
      ...todoDto,
      status: TodoStatusEnum[todoDto.status],
    });
  }
  async softDelete(id: number) {
    return await this.todoRepository.softDelete(id);
  }
  async restore(id: number): Promise<UpdateResult> {
    return await this.todoRepository.restore(id);
  }
  async countByStatus(): Promise<string> {
    return (
      'En cours :' +
      (await this.todoRepository.countBy({ status: TodoStatusEnum.actif })) +
      ' || En attente : ' +
      (await this.todoRepository.countBy({ status: TodoStatusEnum.waiting })) +
      ' || Finalisé :' +
      (await this.todoRepository.countBy({ status: TodoStatusEnum.done }))
    );
  }
  async getTodoQuery1(critere: CritereDto) {
    const qb = this.todoRepository.createQueryBuilder('todo');
    qb.where('todo.name Like :data', { data: '%' + critere.data + '%' })
      .orWhere('todo.description Like :data', {
        data: '%' + critere.data + '%',
      })
      .orWhere('todo.status= :statusParam', {
        statusParam: TodoStatusEnum[critere.status],
      });
    if (!qb.getMany()) throw new NotFoundException();
    return await qb.getMany();
  }
  async getTodoQuery2(critere: CritereDto) {
    const qb = this.todoRepository.createQueryBuilder('todo');
    qb.where('todo.name Like :data', { data: '%' + critere.data + '%' })
      .orWhere('todo.description Like :data', {
        data: '%' + critere.data + '%',
      })
      .andWhere('todo.status= :statusParam', {
        statusParam: TodoStatusEnum[critere.status],
      });
    if (!qb.getMany()) throw new NotFoundException();
    return await qb.getMany();
  }
  async getTodosPaginated(param): Promise<TodoEntity[]> {
    return await this.todoRepository.find({
      skip: (param.page - 1) * param.take,
      take: param.take,
    });
  }
}
