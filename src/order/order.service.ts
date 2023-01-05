import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(private database: DatabaseService) {}

  async makeOrder(userId: number) {
    try {
      const newOrder = await this.database.order.create({
        data: {
          user_id: userId,
        },
      });
      return { data: newOrder };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
