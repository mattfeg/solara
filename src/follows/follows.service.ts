import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}
  async create(followerId: string, followingId: string) {
    const followerExists = await this.prisma.user.findUnique({
      where: { id: followerId },
    });
    if (!followerExists) {
      throw new NotFoundException(`User with ID ${followerId} does not exist.`);
    }

    const followingExists = await this.prisma.user.findUnique({
      where: { id: followingId },
    });
    if (!followingExists) {
      throw new NotFoundException(
        `User with ID ${followingId} does not exist.`,
      );
    }

    const existingFollow = await this.prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      include: {
        follower: { select: { id: true, name: true } },
        following: { select: { id: true, name: true } },
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
      include: {
        follower: true,
        following: true,
      },
    });
  }

  findAllByUser(followerId: string) {
    return this.prisma.follows.findMany({
      where: { followerId },
      include: {
        follower: true,
        following: true,
      },
    });
  }

  findAllFollowersByUser(followingId: string) {
    return this.prisma.follows.findMany({
      where: { followingId }, // Seguidores são aqueles cujo "followingId" é igual ao "userId"
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  findAllFollowingsByUser(followerId: string) {
    return this.prisma.follows.findMany({
      where: { followerId }, // Seguindo são aqueles cujo "followerId" é igual ao "userId"
      include: {
        following: true,
      },
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.follows.delete({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Follow relation not found');
    }
  }

  findAll() {
    return this.prisma.follows.findMany();
  }

  async findOne(id: string) {
    return this.prisma.follows.findUnique({ where: { id } });
  }
}
