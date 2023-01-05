import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() dto: AuthSignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('signIn')
  singIn(
    @Body() dto: AuthSignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(dto, response);
  }
  @Post('logOut')
  logOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logOut(response);
  }
}
