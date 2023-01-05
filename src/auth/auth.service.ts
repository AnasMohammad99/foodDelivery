import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private database: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthSignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      await this.database.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: dto.role,
        },
        // select: {
        //   email: true,
        //   name: true,
        // }
      });
      return 'created successfully';
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async signIn(dto: AuthSignInDto, response: Response) {
    try {
      // find the user
      const user = await this.database.user.findUnique({
        where: { email: dto.email },
      });
      // if does not exist, throw an error
      if (!user) {
        console.log('this email does not exist');
        throw 'this email does not exist';
      }
      const checkPassword = await bcrypt.compare(dto.password, user.password);
      if (!checkPassword) {
        console.log('wrong password');
        throw 'wrong password';
      }
      const jwt = await this.jwtService.signAsync(
        { id: user.id },
        { secret: 'success', expiresIn: '1d' },
      );
      response.cookie('jwt', jwt, { httpOnly: true });
      return 'success';
    } catch (error) {
      throw error;
    }
  }
  async logOut(response: Response) {
    response.clearCookie('jwt');
    return 'loged out';
  }
}
