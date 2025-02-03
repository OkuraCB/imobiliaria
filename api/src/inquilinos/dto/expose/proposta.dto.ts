import { Expose } from 'class-transformer';
import { ImovelDto } from 'src/proprietarios/dto/expose/imovel.dto';

export class PropostaDto {
  @Expose()
  dataProposta: Date;

  @Expose()
  valor: number;

  @Expose()
  imovel: ImovelDto;
}
