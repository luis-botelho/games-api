import { Games } from '.prisma/client';
import { User } from 'src/users/entities/user.entity';

export class Profile {
  id: number;
  title: string;
  image: string;
  userId: number;
  user: User;
  games?: Games[];
}
