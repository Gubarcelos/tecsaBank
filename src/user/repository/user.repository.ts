import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/user/repository/interface/user.repository.interface";
import { User } from "src/domain/model/user";
import { UserEntity } from "src/infra/data/entities/user.entity";
import { Repository } from "typeorm";

export class UserRepository implements IUserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);

    }
    async findByCpf(cpf: string): Promise<User> {
        return this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.savingAccount', 'savingAccount') 
            .leftJoinAndSelect('user.checkingAccount', 'checkingAccount') 
            .where('user.cpf = :cpf', { cpf })
            .getOne();
    }
    async update(user: any): Promise<User> {
        return this.userRepository.save(user);
    }

}