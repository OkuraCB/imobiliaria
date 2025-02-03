import { Certidao, Imovel } from '@prisma/client';
import { Expose } from 'class-transformer';
import { TelefoneDto } from './telefone.dto';

export class ProprietarioDto {
  @Expose()
  id: number;

  @Expose()
  cpf: string;

  @Expose()
  nome: string;

  @Expose()
  estadoCivil: string;

  @Expose()
  telefones: TelefoneDto[];

  @Expose()
  registros: Certidao[];

  @Expose()
  imoveis: Imovel[];
}
