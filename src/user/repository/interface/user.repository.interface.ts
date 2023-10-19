import { User } from "src/domain/model/user";


export interface IUserRepository{
    create(user : User) : Promise <User>;
    findBYId (id : string) : Promise<User>
    findByCpf(cpf : string) : Promise <User>;
    update (user) : Promise <User>;
}