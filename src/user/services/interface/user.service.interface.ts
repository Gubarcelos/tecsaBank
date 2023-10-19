import { User } from "src/domain/model/user";

export interface IUserService {
    createUser(name: string, cpf: string, email: string);
    updatePass(cpf : string, numberPass : string);
    login(cpf : string, numberPass : string): Promise<User>;
}