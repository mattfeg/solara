import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [UsersModule, FollowsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
