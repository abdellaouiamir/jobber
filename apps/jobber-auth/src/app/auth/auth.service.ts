import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInpute } from './dto/login.input';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login({ email, password }: LoginInpute, response: Response) {
    const user = await this.verifyUser(email, password);
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.findUser({
        email,
      });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials not valid');
    }
  }
}
