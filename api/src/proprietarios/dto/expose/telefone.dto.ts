import { Expose } from 'class-transformer';

export class TelefoneDto {
  @Expose()
  numero: string;
}
