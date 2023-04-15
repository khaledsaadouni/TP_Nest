import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './models/dto/CreateUserDto';
import { UserService } from './user.service';
import { LoginDto } from './models/dto/LoginDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto): Promise<LoginDto> {
    return await this.userService.login(createUserDto);
  }
}
