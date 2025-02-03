import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVisitaDto {
  @IsNotEmpty({ message: 'Date should not be empty' })
  @IsDate()
  dataVisita: Date;

  @IsNotEmpty({ message: 'Imovel should not be empty' })
  @IsNumber()
  imovelId: number;
}
