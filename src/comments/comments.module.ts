import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
