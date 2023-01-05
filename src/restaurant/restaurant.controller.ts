import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { createRestaurant } from './dto/dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}
  @Post('addRestaurant')
  addRestaurant(@Body() dto: createRestaurant, @Req() request: Request) {
    return this.restaurantService.addRestaurant(dto, request);
  }
  @Get('getAllRestaurants')
  getAllRestaurants() {
    return this.restaurantService.getAllRestaurants();
  }
  @Get('getRestaurant/:id')
  getRestaurant(@Param('id') id: number) {
    return this.restaurantService.getRestaurant(id);
  }
}
