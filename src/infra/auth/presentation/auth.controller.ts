import { Body, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from '../auth.service';

import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() payload: LoginDto,@Res() res : Response) {
    const accessToken = await this.authService.signIn(payload.cpf, payload.password);
    res.set('Authorization', `Bearer ${accessToken.access_token}`);
    return res.json({ message: 'Login bem-sucedido' });
  }

}
