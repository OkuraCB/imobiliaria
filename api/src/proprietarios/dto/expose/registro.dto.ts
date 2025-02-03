import { Expose } from 'class-transformer';

export class RegistroDto {
  @Expose()
  numero: string;

  @Expose()
  dataReg: Date;
}
