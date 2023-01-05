import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Category {
  SUSHI = 'SUSHI',
  MEAT = 'MEAT',
  BURGER = 'BURGER',
  CAKE = 'CAKE',
  VEGETABLE = 'VEGETABLE',
  PIZZA = 'PIZZA',
}
export class addProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsOptional()
  thumbnail_photo_url: string;
  @IsEnum(Category)
  @IsOptional()
  category: Category;
}
