import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { PartController } from './controller/part.controller';
import { PartService } from './service/part.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    BookController,
    PartController,
  ],
  providers: [
    UserService,
    BookService,
    PartService,
  ],
})
export class AppModule {}