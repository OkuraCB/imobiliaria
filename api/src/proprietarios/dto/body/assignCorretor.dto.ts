import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignCorretorDto {
  @IsNotEmpty({ message: 'Corretor should not be empty' })
  @IsNumber()
  corretorId: number;
}
