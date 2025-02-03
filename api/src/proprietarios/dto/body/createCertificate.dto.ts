import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCertificateDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  numero: string;

  @IsNotEmpty({ message: 'Data should not be empty' })
  @IsDate()
  dataReg: Date;

  @IsNotEmpty({ message: 'Imovel should not be empty' })
  @IsNumber()
  imovelId: number;
}
