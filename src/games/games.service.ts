import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}
  private _include = { genres: true };
  create(dto: CreateGameDto) {
    const data: Prisma.GamesCreateInput = {
      ...dto,
      genres: dto.genres
        ? {
            connectOrCreate: dto.genres.map((genre) => ({
              where: genre,
              create: genre,
            })),
          }
        : {},
    };
    return this.prisma.games.create({ data });
  }

  findAll() {
    return this.prisma.games.findMany({ include: this._include });
  }
  // findByProfile(profile: string) {
  //   return this.prisma.games.findMany({
  //     where: { profile: profile },
  //     include: this._include,
  //   });
  // }
  findOne(id: number) {
    return this.prisma.games.findFirst({
      where: { id },
      include: this._include,
    });
  }

  update(id: number, dto: UpdateGameDto) {
    const data: Prisma.GamesUpdateInput = {
      ...dto,
      genres: dto.genres
        ? {
            connectOrCreate: dto.genres.map((genre) => ({
              where: genre,
              create: genre,
            })),
          }
        : {},
      profiles: {},
    };

    return this.prisma.games.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.games.delete({ where: { id } });
  }
}
