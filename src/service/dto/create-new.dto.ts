import { IsBoolean } from "class-validator";
import { CreateUserDto } from "src/user/presentation/dto/create-user.dto";

export class CreateNewDTO extends CreateUserDto {
    
    @IsBoolean()
    createCpAccount : boolean
}