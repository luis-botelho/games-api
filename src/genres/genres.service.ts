import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}
  private _include = {
    games: true,
  };
  create(data: CreateGenreDto) {
    return this.prisma.genres.create({ data });
  }

  findAll() {
    return this.prisma.genres.findMany({ include: this._include });
  }

  findOne(id: number) {
    return this.prisma.genres.findFirst({
      where: { id },
      include: this._include,
    });
  }

  update(id: number, data: UpdateGenreDto) {
    return this.prisma.genres.update({ where: { id }, data });
  }
  remove(id: number) {
    return this.prisma.genres.delete({ where: { id } });
  }
}
