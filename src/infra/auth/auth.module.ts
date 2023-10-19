import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './presentation/auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService,AuthGuard],
  exports: [AuthService,AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}