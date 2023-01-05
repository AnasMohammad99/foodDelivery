import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnerService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async addOwner(request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: 'success',
    });
    try {
      const newOwner = await this.database.owner.create({
        data: {
          user_id: data['id'],
        },
      });
      console.log(newOwner);
      return { data: newOwner };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAllOwners(request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: 'success',
    });

    try {
      const user = await this.database.user.findUnique({
        where: {
          id: data['id'],
        },
      });
      if (user.role !== 'ADMIN') return 'you are not authorized';
      const getAllOwners = await this.database.owner.findMany({
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      return { data: getAllOwners };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // async getOwner(id: number, request: Request) {
  //   const cookie = request.cookies['jwt'];
  //   const data = await this.jwtService.verifyAsync(cookie, {
  //     secret: 'success',
  //   });
  //   try {
  //     const getOwner = await this.database.owner.findUnique({
  //       where: {
  //         id: data['id'],
  //       },
  //       select: {
  //         user: {
  //           select: {
  //             name: true,
  //             email: true,
  //           },
  //         },
  //         resturant: {
  //           select: {
  //             products: true,
  //           },
  //         },
  //       },
  //     });
  //     return { data: getOwner };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  async removeOwner(request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: 'success',
    });
    try {
      const deletedOwner = await this.database.owner.delete({
        where: {
          user_id: data['id'],
        },
      });
      console.log(deletedOwner);
      return { data: deletedOwner };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
