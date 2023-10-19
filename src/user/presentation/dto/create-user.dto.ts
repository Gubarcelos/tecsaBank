import { IsString, IsNumber, IsEmail } from 'class-validator';
import { IsCpf } from 'src/domain/decorators/is-cpf.decorator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsCpf()
  cpf: string;

  @IsEmail()
  mail: string;
}