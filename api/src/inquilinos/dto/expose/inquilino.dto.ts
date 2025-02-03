import { Certidao, Imovel } from '@prisma/client';
import { Expose } from 'class-transformer';

export class InquilinoDto {
  @Expose()
  id: number;

  @Expose()
  cpf: string;

  @Expose()
  nome: string;

  @Expose()
  profissao: string;

  @Expose()
  renda: number;

  @Expose()
  registros: Certidao[];

  @Expose()
  imoveis: Imovel[];
}
