import { IsString, IsNumberString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  cpf: string;

  @IsNumberString()
  @Length(6, 6, { message: 'A senha deve conter 6 dígitos numéricos' })
  password: string;
}