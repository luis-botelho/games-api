import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  private _include = {
    profiles: { select: { title: true, image: true } },
  };
  async create(dto: CreateUserDto) {
    const data: Prisma.UsersCreateInput = {
      ...dto,
      profiles: dto.profiles ? { create: dto.profiles } : {},
    };

    return this.prisma.users.create({
      data,
      include: this._include,
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
      include: this._include,
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}