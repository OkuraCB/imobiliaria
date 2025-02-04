import { Expose } from 'class-transformer';
import { CorretorDto } from './corretor.dto';
import { ProprietarioDto } from './proprietario.dto';
import { RegistroDto } from './registro.dto';

export class ImovelDto {
  @Expose()
  endereco: string;

  @Expose()
  numComodos: number;

  @Expose()
  vagas: number;

  @Expose()
  area: number;

  @Expose()
  dataCad: Date;

  @Expose()
  aluguel: number;

  @Expose()
  proprietario: ProprietarioDto;

  @Expose()
  corretor: CorretorDto;

  @Expose()
  certidao: RegistroDto;
}
