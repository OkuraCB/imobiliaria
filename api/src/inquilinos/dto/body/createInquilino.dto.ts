import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInquilinoDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'CPF should not be empty' })
  @IsString()
  cpf: string;

  @IsNotEmpty({ message: 'Profissao should not be empty' })
  @IsString()
  profissao: string;

  @IsNotEmpty({ message: 'Renda should not be empty' })
  @IsNumber()
  renda: number;
}
