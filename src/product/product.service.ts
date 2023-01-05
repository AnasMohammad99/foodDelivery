import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { addProductDto } from './dto/dto';

@Injectable()
export class ProductService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async addProduct(dto: addProductDto, request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: 'success',
    });
    const owner = await this.database.owner.findUnique({
      where: {
        user_id: data['id'],
      },
      select: {
        id: true,
        resturant: {
          select: {
            id: true,
          },
        },
      },
    });
    try {
      const newProduct = await this.database.product.create({
        data: {
          restaurant_id: owner.resturant.id,
          name: dto.name,
          thumbnail_photo_url: dto.thumbnail_photo_url,
          description: dto.description,
          category: dto.category,
        },
      });
      return { data: newProduct };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getRestaurantProducts(restaurantId: number) {
    try {
      const RestaurantProducts = await this.database.product.findMany({
        where: {
          restaurant_id: restaurantId,
        },
      });
      return { data: RestaurantProducts };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getProduct(productId: number) {
    try {
      const product = await this.database.product.findUnique({
        where: {
          id: productId,
        },
      });
      return { data: product };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
