import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [JwtModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
