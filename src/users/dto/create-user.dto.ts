import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { Cpf } from 'src/decorators/cpf.decorators';

export class CreateUserDto {
  @IsString({ message: 'The name needs to be a string' })
  @IsNotEmpty({ message: 'The name is empty' })
  name: string;

  @IsString({ message: 'The last needs to be a string' })
  @IsNotEmpty({ message: 'The lastName is empty' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'The email is empty' })
  email: string;

  @IsString({ message: 'The password needs to be a string' })
  @IsNotEmpty({ message: 'The password is empty' })
  password: string;

  @Cpf()
  cpf: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProfileDto)
  @IsArray()
  @IsOptional()
  profiles?: CreateProfileDto[];
}
