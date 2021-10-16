import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateGenreDto) {
    return this.prisma.genres.create({ data });
  }

  findAll() {
    return this.prisma.genres.findMany({});
  }

  findOne(id: number) {
    return this.prisma.genres.findFirst({ where: { id } });
  }

  update(id: number, data: UpdateGenreDto) {
    return this.prisma.genres.update({ where: { id }, data });
  }
  remove(id: number) {
    return this.prisma.genres.delete({ where: { id } });
  }
}
