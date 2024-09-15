import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateFollowDto) {
    const { followerId, followingId } = data;
    const existingFollow = await this.prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      include: {
        follower: { select: { name: true } },
        following: { select: { name: true } },
      },
    });

    if (existingFollow) {
      throw new ConflictException(
        `${existingFollow.follower.name} already follows ${existingFollow.following.name}`,
      );
    }
    return this.prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  findAll() {
    return this.prisma.follows.findMany({
      include: {
        follower: true,
        following: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.follows.findUnique({
      where: { id },
      include: {
        follower: true,
        following: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.follows.delete({ where: { id } });
  }
}
