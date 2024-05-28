import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbService } from '../db.service';
import { User } from './user.interface';

@Module({
  providers: [UserService, DbService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}