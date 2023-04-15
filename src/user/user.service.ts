import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './models/dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './models/dto/LoginDto';
import { UserModule } from './user.module';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.userRepository.save(createUserDto);
  }

  async login(createUserDto: CreateUserDto): Promise<LoginDto> {
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (!user) {
      throw new NotFoundException('User inexistant');
    }
    if (user.password != createUserDto.password) {
      throw new NotFoundException('Password incorrect');
    }
    const log = new LoginDto();
    log.jwt = this.jwtService.sign(user);
    return log;
  }
  create1(createDto) {
    return this.userRepository.save(createDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateDto) {
    return this.userRepository.update(id, {
      ...updateDto,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
