import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserService } from "./interface/user.service.interface";
import * as bcrypt from 'bcrypt';
import { User } from "src/domain/model/user";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly userRepository: UserRepository,
      ) {}


    async createUser(name: string, cpf: string, mail: string) {
        const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const user : User = new User();
        user.name = name;
        user.cpf = cpf;
        user.numberPass = hashedPassword;
        user.activated = true;
        user.mail = mail

        const createdUser = await this.userRepository.create(user);
        return {createdUser, randomPassword};
    }

    async updatePass(cpf: string, numberPass: string) {
        const user = await this.userRepository.findByCpf(cpf);
        if (!user) {
            throw new BadRequestException('invalid user');
          }
          user.numberPass = numberPass;
          const updatedUser = this.userRepository.update(user);
          return updatedUser;
    }
    async login(cpf: string, numberPass: string): Promise<User> {
        const user = await this.userRepository.findByCpf(cpf);
        if (!user) {
            throw new UnauthorizedException('Invalid login');
          }
          const isPasswordValid = await bcrypt.compare(numberPass, user.numberPass);
          if (isPasswordValid) {
            return user;
          } else {
            throw new UnauthorizedException('Invalid password');
          }
    }

    async getOne(id : string) {
      const user = this.userRepository.findBYId(id);
      return user;
    }

}