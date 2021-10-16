import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { UpdateGameDto } from 'src/games/dto/update-game.dto';
import { CreateProfileDto } from './create-profile.dto';
export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ValidateNested({ each: true })
  @Type(() => UpdateGameDto)
  @IsArray()
  @IsOptional()
  games?: UpdateGameDto[];
}
