import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async getUser(request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: 'success',
    });
    const user = await this.database.user.findUnique({
      where: {
        id: data['id'],
      },
      select: {
        email: true,
        name: true,
        orders: true,
        owner: true,
      },
    });
    return { user };
  }
  async getAllUsers(request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: 'success',
    });
    const user = await this.database.user.findUnique({
      where: { id: data['id'] },
    });
    if (user.role !== 'ADMIN') return 'you are not authurized';
    const users = await this.database.user.findMany({
      select: {
        email: true,
        name: true,
        orders: true,
        owner: true,
      },
    });
    return { users };
  }
}
