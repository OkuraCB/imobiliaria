import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePropostaDto {
  @IsNotEmpty({ message: 'Date should not be empty' })
  @IsDate()
  dataProposta: Date;

  @IsNotEmpty({ message: 'Valor should not be empty' })
  @IsNumber()
  valor: number;

  @IsNotEmpty({ message: 'Imovel should not be empty' })
  @IsNumber()
  imovelId: number;
}
