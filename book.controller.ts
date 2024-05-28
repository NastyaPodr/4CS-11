import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { Book } from '../book.interface';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(@Body() body: { title: string, pageLinks: { pageLink: string }[] }): Book {
    const { title, pageLinks } = body;
    return this.bookService.createBook(title, pageLinks);
  }

  @Get(':userId')
  getBooksByUserId(@Param('userId') userId: string): Book[] {
    return this.bookService.findBooksByUserId(userId);
  }
}