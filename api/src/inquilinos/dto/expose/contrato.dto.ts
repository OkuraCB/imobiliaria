import { Expose } from 'class-transformer';

export class ContratoDto {
  @Expose()
  ativo: boolean;
}
