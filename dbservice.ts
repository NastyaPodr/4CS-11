import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DbService<T> {
  private fileName: string;
  private data: T[];

  constructor(collectionName: string) {
    this.fileName = `${collectionName}.json`;
    this.data = this.readDataFromFile() || [];
  }

  private readDataFromFile(): T[] | null {
    try {
      const records = fs.readFileSync(this.fileName, 'utf-8');
      return JSON.parse(records || '[]');
    } catch (error) {
      console.error(`Error reading file ${this.fileName}:`, error);
      return null;
    }
  }

  private saveDataToFile() {
    try {
      fs.writeFileSync(this.fileName, JSON.stringify(this.data, null, '  '));
    } catch (error) {
      console.error(`Error writing file ${this.fileName}:`, error);
    }
  }

  push(el: T) {
    this.data.push(el);
    this.saveDataToFile();
  }

  filter(cb: (el: T) => boolean): T[] {
    return this.data.filter(cb);
  }

  map<U>(cb: (el: T) => U): U[] {
    return this.data.map(cb);
  }

  find(cb: (el: T) => boolean): T | undefined {
    return this.data.find(cb);
  }

  save(key: keyof T, data: Partial<T>) {
    const index = this.data.findIndex((el) => el[key] === data[key]);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...data };
      this.saveDataToFile();
    }
  }

  some(cb: (el: T) => boolean): boolean {
    return this.data.some(cb);
  }

  generateApiKey(): string {
    // Generate a random API key
    const apiKey = Math.random().toString(36).substr(2, 10);
    return apiKey;
  }
}