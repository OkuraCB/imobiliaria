import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInquilinoDto {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  estadoCivil: string;

  @IsOptional()
  @IsNumber()
  renda: number;
}
