import { Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('my-profile')
  getUser(@Req() request: Request) {
    return this.userService.getUser(request);
  }
  @Get('getAllUsers')
  getAllUsers(@Req() request: Request) {
    return this.userService.getAllUsers(request);
  }
}
