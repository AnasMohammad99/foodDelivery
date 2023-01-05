import { Controller, Get, Param, Post, Res, Req, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Request } from 'express';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}
  @Post('addOwner')
  addOwner(@Req() request: Request) {
    return this.ownerService.addOwner(request);
  }
  @Delete('removeOwner')
  removeOwner(@Req() request: Request) {
    return this.ownerService.removeOwner(request);
  }
  @Get('getOwners')
  getAllOwners(@Req() request: Request) {
    return this.ownerService.getAllOwners(request);
  }
  // @Get('getOwner/:owner_id')
  // getOwner(@Param('owner_id') owner_id: number, @Res() request: Request) {
  //   return this.ownerService.getOwner(+owner_id, request);
  // }
}
