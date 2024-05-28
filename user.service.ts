import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService<User>) {}

  createUser(user: User): User {
    const existingUser = this.dbService.find((u) => u.email === user.email);
    if (existingUser) {
      throw new Error(`This email is already in use`);
    }

    if (!user.email) {
      throw new Error(`This field 'email' is required`);
    }

    if (!user.password) {
      throw new Error(`This field 'password' is required`);
    }

    const apiKey = this.dbService.generateApiKey();
    const newUser = { ...user, apiKey };
    this.dbService.push(newUser);
    return newUser;
  }

  getUsers(): User[] {
    return this.dbService.map((user) => {
      const { password, ...other } = user;
      return other;
    });
  }
}