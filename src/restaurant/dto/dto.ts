import { IsNotEmpty, IsString } from 'class-validator';

export class createRestaurant {
  @IsString()
  @IsNotEmpty()
  name: string;
}
