import { Body, Controller, Put, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/infra/auth/auth.guard';
import { UserService } from '../services/user.impl.service';
import { AuthService } from 'src/infra/auth/auth.service';4
import { Response } from 'express';
import { UserT } from 'src/infra/auth/decorators/user.decorator';


@Controller('user')
export class UserController {

    constructor(
      private readonly userService : UserService,
      private readonly authService : AuthService
      ){}

    @UseGuards(AuthGuard)
    @Put('password')
    async updatePassword(@UserT() user: any, @Body() newPassword: string,@Res() res : Response) {
      if (!newPassword) {
        throw new UnauthorizedException('Nova senha inválida');
      }

      const updatedUser = await this.userService.updatePass(user.cpf,newPassword);
      const token = await this.authService.signIn(updatedUser.cpf,updatedUser.numberPass);

    res.set('Authorization', `Bearer ${token.access_token}`);
    return res.json({ message: 'Senha alterada com sucesso' });

    }    
}
