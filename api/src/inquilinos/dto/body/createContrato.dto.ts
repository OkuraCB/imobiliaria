import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContratoDto {
  @IsNotEmpty({ message: 'Imovel should not be empty' })
  @IsNumber()
  imovelId: number;
}
