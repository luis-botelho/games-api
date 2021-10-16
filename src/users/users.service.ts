import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  private _include = {
    profiles: {
      select: { title: true, image: true, id: true, userId: true, user: true },
    },
  };
  async create(dto: CreateUserDto) {
    const data: Prisma.UsersCreateInput = {
      ...dto,
      profiles: dto.profiles ? { create: dto.profiles } : {},
      password: await bcrypt.hash(dto.password, 10),
    };
    const createdUser = await this.prisma.users.create({ data });
    return {
      ...createdUser,
      password: undefined,
    };
  }

  findAll() {
    return this.prisma.users.findMany();
  }
  findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
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
