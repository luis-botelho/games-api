import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { User } from 'src/users/entities/user.entity';

export class CreateProfileDto {
  @IsString({ message: 'The title must be string type.' })
  @IsNotEmpty({ message: 'The title must not be empty.' })
  title: string;

  @IsString({ message: 'The image must be a string type.' })
  @IsNotEmpty({ message: 'The image must not be empty.' })
  image: string | null;

  @IsOptional()
  user: User;

  @IsInt({ each: true })
  @IsArray()
  @IsOptional()
  gamesIds?: number[];
}
