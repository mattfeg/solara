import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [LikesService,PrismaService],
})
export class LikesModule {}
