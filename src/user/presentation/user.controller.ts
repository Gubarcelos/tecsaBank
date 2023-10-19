import { Body, Controller, Get, Param, Put, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/infra/auth/auth.guard';
import { UserService } from '../services/user.impl.service';
import { AuthService } from 'src/infra/auth/auth.service';4
import { Response } from 'express';
import { UserT } from 'src/infra/auth/decorators/user.decorator';
import { UserDTO } from './dto/user.dto';


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


    @UseGuards(AuthGuard)
    @Get(':id')
    async findUser(@Param('id') id : string,@Res() res : Response) {
      const user = await this.userService.getOne(id);
      const userDTO : UserDTO= {
        id : user.id,
        mail : user.mail,
        cpf : user.cpf,
        name : user.name,
        savingAccount : {
          id : user.savingAccount.id,
          accountNumber : user.savingAccount.accountNumber,
          agency : user.savingAccount.agency,
          balance : user.savingAccount.balance,
        },
        checkingAccount: {
          id : user.checkingAccount.id,
          accountNumber : user.checkingAccount.accountNumber,
          agency : user.checkingAccount.agency,
          balance : user.checkingAccount.balance,
        }
      }
      return res.json(userDTO);
    }
}
