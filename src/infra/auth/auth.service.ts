import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/domain/interface/jwtPayload.interface';
import { UserService } from 'src/user/services/user.impl.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(username, pass) {
    const user = await this.userService.login(username, pass);
    const payload: IJwtPayload = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      mail: user.mail,
      accounts: {
        checkingAccount: {
          agency: user.checkingAccount.agency,
          accountNumber: user.checkingAccount.accountNumber,
          pixKey: user.checkingAccount.pixKey,
        },
      },
    };
    
    if (user.savingAccount) {
      payload.accounts.savingAccount = {
        agency: user.savingAccount.agency,
        accountNumber: user.savingAccount.accountNumber,
        pixKey: user.savingAccount.pixKey,
      };
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async validateToken(token: string): Promise<IJwtPayload> {
    try {
      const secret = process.env.SECRET_KEY;
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });

      if (this.isValidPayload(payload)) {
        return payload;
      }

      throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
  }

  private isValidPayload(payload): payload is IJwtPayload {
    return (
      typeof payload === 'object' &&
      typeof payload.id === 'string' &&
      typeof payload.name === 'string' &&
      typeof payload.cpf === 'string' &&
      typeof payload.mail === 'string' &&
      this.isValidAccount(payload.accounts?.checkingAccount) &&
      (payload.accounts?.savingAccount ? this.isValidAccount(payload.accounts.savingAccount) : true)
    );
  }

  private isValidAccount(account: any): account is IJwtPayload['accounts']['checkingAccount'] {
    return (
      typeof account === 'object' &&
      typeof account.agency === 'string' &&
      typeof account.accountNumber === 'string'
    );
  }
}
