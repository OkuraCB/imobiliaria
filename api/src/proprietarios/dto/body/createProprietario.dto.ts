import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProprietarioDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'CPF should not be empty' })
  @IsString()
  cpf: string;

  @IsNotEmpty({ message: 'Estado Civil should not be empty' })
  @IsString()
  estadoCivil: string;
}
