import { Injectable } from '@nestjs/common';
import { User } from '../user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(username: string, password: string): User {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      password,
    };
    this.users.push(newUser);
    return newUser;
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
}