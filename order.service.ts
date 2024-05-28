import { Injectable } from '@nestjs/common';
import { OrderDto } from '../models';
import { Orders, OrdersDoc } from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(private readonly dbService: DbService) {}

  addAddress(newAddress: string) {
    if (!this.dbService.addresses.includes(newAddress)) {
      this.dbService.addresses.push(newAddress);
      if (this.dbService.addresses.length > 5) {
        this.dbService.addresses.shift();
      }
    }
  }

  addToAddress(newAddress: string) {
    if (!this.dbService.toAddresses.includes(newAddress)) {
      this.dbService.toAddresses.push(newAddress);
      if (this.dbService.toAddresses.length > 3) {
        this.dbService.toAddresses.shift();
      }
    }
  }

  generateRandomPrice(): number {
    return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
  }

  createOrder(to: string, userToken: string) {
    const user = this.dbService.users[userToken];
    if (!user) {
      throw new Error(`User was not found by token: ${userToken}`);
    }
    this.addToAddress(to);
    const newOrder = {
      userId: user.id,
      to,
      price: this.generateRandomPrice(),
    };
    this.dbService.orders.push(newOrder);
    return newOrder;
  }

  getLowestOrder(userToken: string) {
    const user = this.dbService.users[userToken];
    if (!user) {
      throw new Error(`User was not found by token: ${userToken}`);
    }
    const userOrders = this.dbService.orders.filter((order) => order.userId === user.id);
    if (userOrders.length === 0) {
      throw new Error('User do not have orders yet');
    }
    return userOrders.reduce((minOrder, currentOrder) =>
      currentOrder.price < minOrder.price ? currentOrder : minOrder
    );
  }

  getBiggestOrder(userToken: string) {
    const user = this.dbService.users[userToken];
    if (!user) {
      throw new Error(`User was not found by token: ${userToken}`);
    }
    const userOrders = this.dbService.orders.filter((order) => order.userId === user.id);
    if (userOrders.length === 0) {
      throw new Error('User do not have orders yet');
    }
    return userOrders.reduce((maxOrder, currentOrder) =>
      currentOrder.price > maxOrder.price ? currentOrder : maxOrder
    );
  }
}