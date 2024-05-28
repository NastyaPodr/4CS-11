import { Injectable } from '@nestjs/common';
import { Book } from '../book.interface';

@Injectable()
export class BookService {
  private books: Book[] = [];

  createBook(title: string, pageLinks: { pageLink: string }[]): Book {
    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      pageLinks,
    };
    this.books.push(newBook);
    return newBook;
  }

  findBooksByUserId(userId: string): Book[] {
    // Implement logic to find books by user ID
    return this.books.filter(book => /* your logic to filter books by userId */);
  }
}