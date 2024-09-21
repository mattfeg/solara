import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {
  }
  create(data: CreateLikeDto) {
    return this.prisma.like.create({data});
  }

  findAllByPost(id: string) {
    return this.prisma.like.findMany({where: { id }});
  }

  remove(id: string) {
    return this.prisma.like.delete({ where: { id }});
  }
}
