import { Body, Controller, Param, Post, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { addProductDto } from './dto/addProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('addProduct')
  create(@Body() dto: addProductDto, @Req() request: Request) {
    return this.productService.addProduct(dto, request);
  }
  @Get('getRestaurantProducts/:restaurantId')
  getAllRestaurants(@Param('restaurantId') restaurantId: number) {
    return this.productService.getRestaurantProducts(restaurantId);
  }
  @Get('getProduct/:productId')
  getProduct(@Param('productId') productId: number) {
    return this.productService.getProduct(productId);
  }
}
