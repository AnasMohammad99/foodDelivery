import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [JwtModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
