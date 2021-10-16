import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConnectGameDto } from 'src/games/dto/connect-game-dto';
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

  // @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  gamesIds?: number[];
}
