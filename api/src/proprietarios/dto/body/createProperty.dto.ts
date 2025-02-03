import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty({ message: 'Endereco should not be empty' })
  @IsString()
  endereco: string;

  @IsNotEmpty({ message: 'Comodos should not be empty' })
  @IsNumber()
  numComodos: number;

  @IsNotEmpty({ message: 'Vagas should not be empty' })
  @IsNumber()
  vagas: number;

  @IsNotEmpty({ message: 'Area should not be empty' })
  @IsNumber()
  area: number;

  @IsNotEmpty({ message: 'Area should not be empty' })
  @IsNumber()
  aluguel: number;
}
