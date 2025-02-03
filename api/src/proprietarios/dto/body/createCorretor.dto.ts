import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCorretorDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'CPF should not be empty' })
  @IsString()
  cpf: string;

  @IsNotEmpty({ message: 'CRECI should not be empty' })
  @IsString()
  creci: string;

  @IsNotEmpty({ message: 'CRECI should not be empty' })
  @IsNumber()
  comissao: number;
}
