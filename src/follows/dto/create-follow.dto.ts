import { IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateFollowDto implements Prisma.FollowsCreateInput {
  @IsString()
  id?: string;

  @IsOptional()
  created_at?: string | Date;

  @IsOptional()
  updated_at?: string | Date;

  @IsString()
  followerId: string;

  @IsString()
  followingId: string;

  follower: Prisma.UserCreateNestedOneWithoutFollowersInput;
  following: Prisma.UserCreateNestedOneWithoutFollowingInput;
}
