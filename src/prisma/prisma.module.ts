import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //to make the database available in our app
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
