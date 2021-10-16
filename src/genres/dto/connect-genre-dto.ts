import { IsInt } from 'class-validator';

export class ConnectGenreDto {
  @IsInt()
  name: string;
}
