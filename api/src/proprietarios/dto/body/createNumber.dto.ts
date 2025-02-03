import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNumberDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  numero: string;
}
