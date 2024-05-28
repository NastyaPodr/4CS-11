import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  public readonly USERS = [];
  public readonly ORDERS = [];
}