import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { createRestaurant } from './dto/dto';

@Injectable()
export class RestaurantService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async addRestaurant(dto: createRestaurant, request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie, {
        secret: 'success',
      });
      const owner = await this.database.owner.findUnique({
        where: {
          user_id: data['id'],
        },
      });
      const newRestaurant = await this.database.restaurant.create({
        data: {
          name: dto.name,
          owner_id: owner.id,
        },
        select: {
          name: true,
          owner: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return { data: newRestaurant };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAllRestaurants() {
    try {
      const allRestaurants = this.database.restaurant.findMany({
        select: {
          name: true,
          owner: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return { data: allRestaurants };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getRestaurant(id: number) {
    try {
      const restaurant = this.database.restaurant.findUnique({
        where: {
          id: id,
        },
        select: {
          name: true,
          owner: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return { data: restaurant };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
