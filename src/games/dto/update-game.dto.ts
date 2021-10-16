import { PartialType } from '@nestjs/mapped-types';
import { Profiles } from '@prisma/client';
import { Genre } from 'src/genres/entities/genre.entity';

import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  id: number;
  title: string;
  cover: string;
  description: string;
  year: number;
  IMDB: number;
  trailer: string;
  gameplay: string;
  genre?: Genre[];
}
