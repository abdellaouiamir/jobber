import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './interfaces/token-payload.interface';

@Controller()
@AuthServiceControllerMethods()
@UseGuards(JwtAuthGuard)
export class AuthController implements AuthServiceController {
  constructor(private readonly userService: UsersService) {}
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload }
  ): Promise<User> | Observable<User> | User {
    return this.userService.findUser({ id: request.user.userId });
  }
}
