import { Imovel } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CorretorDto {
  @Expose()
  id: number;

  @Expose()
  cpf: string;

  @Expose()
  nome: string;

  @Expose()
  creci: string;

  @Expose()
  inicio: Date;

  @Expose()
  comissao: number;

  @Expose()
  imoveis: Imovel[];
}
