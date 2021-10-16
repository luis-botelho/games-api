import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { GenresModule } from './genres/genres.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [UsersModule, ProfilesModule, GenresModule, GamesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
