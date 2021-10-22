import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly _include: Prisma.ProfilesInclude = {
    user: true,
    games: true,
  };
  create(dto: CreateProfileDto) {
    const gamesIds = dto.gamesIds;
    delete dto.gamesIds;
    const data: Prisma.ProfilesCreateInput = {
      ...dto,
      user: { connect: { id: dto.user.id } },
      games: {
        connect: gamesIds?.map((gameId) => ({ id: gameId })) || [],
      },
    };
    return this.prisma.profiles.create({ data, include: this._include });
  }

  findAll(id: number) {
    return this.prisma.profiles.findMany({
      where: { userId: id },
      include: { games: true },
    });
  }

  findOne(id: number) {
    return this.prisma.profiles.findUnique({
      where: { id },
      include: { games: true },
    });
  }

  update(id: number, data: UpdateProfileDto) {
    return 'this.prisma.profiles.update({ where: { id },});';
  }

  remove(id: number) {
    return this.prisma.profiles.delete({ where: { id } });
  }
}
