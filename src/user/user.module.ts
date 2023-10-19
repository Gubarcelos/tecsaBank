import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from 'src/infra/data/entities/user.entity';
import { UserService } from './services/user.impl.service';
import { DataBaseModule } from 'src/infra/data/database.module';
import { UserController } from './presentation/user.controller';
import { AuthModule } from 'src/infra/auth/auth.module';
import { AuthService } from 'src/infra/auth/auth.service';


@Module({
  imports: [AuthModule,DataBaseModule,TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}