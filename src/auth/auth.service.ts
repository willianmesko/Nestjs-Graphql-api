import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth.input';
import { compareSync } from 'bcrypt';
import { AuthType } from './dto/auth.type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(email);

    const validPassword = compareSync(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorret password');
    }
    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { userName: user.name, sub: user.id };

    return this.jwtService.signAsync(payload);
  }
}
