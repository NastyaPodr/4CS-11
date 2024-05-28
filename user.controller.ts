import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: { username: string, password: string }): User {
    const { username, password } = body;
    return this.userService.createUser(username, password);
  }
}