import { Expose } from 'class-transformer';
import { ImovelDto } from 'src/proprietarios/dto/expose/imovel.dto';

export class VisitaDto {
  @Expose()
  dataVisita: Date;

  @Expose()
  imovel: ImovelDto;
}
