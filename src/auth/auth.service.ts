import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './model/LoginDto';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './model/UserPayload';
import { UserToken } from './model/UserToken';
import { UnauthorizedError } from 'src/errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<UserToken> {
    const user: User = await this.validateUser(dto.email, dto.password);
    const isAdmin: User = await this.usersService.findByEmail(user.email);
    const payload: UserPayload = {
      sub: user.id,
      username: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      admin: isAdmin.admin,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    // Buscamos o user pelo e-mail
    const user: User = await this.usersService.findByEmail(email);

    // Caso user esteja no banco, valido se a senha informada foi correta
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Se a senha for válida, retornamos o objeto do usuário, sem senha

        return {
          ...user,
          password: undefined,
        };
      }
    }

    // Se sairmos no if (ou nem entrarmos)
    // significa que o `return` não foi chamado
    // Se não passar no return, não vai encerrar o método
    // O que significa que: ou o usuário não é válido (e-mail não encontrado)
    // Ou a senha é incorreta
    // Por tanto, enviamos um erro

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
