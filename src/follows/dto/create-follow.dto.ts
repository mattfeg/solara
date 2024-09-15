import { IsString } from 'class-validator';

export class CreateFollowDto {
  @IsString()
  followerId: string;

  @IsString()
  followingId: string;
}
