import { IsOptional, IsString } from 'class-validator';

export class UpdateProprietarioDto {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  estadoCivil: string;
}
