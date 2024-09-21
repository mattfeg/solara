import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateCommentDto) {
    return this.prisma.comment.create({ data });
  }

  findAllByPost(userId: string) {
    return this.prisma.comment.findMany({ where : { userId }});
  }

  update(id: string, data: UpdateCommentDto) {
    return this.prisma.comment.update({ where: {id}, data});
  }

  remove(id: string) {
    return this.prisma.comment.delete({where: { id}});
  }
}
