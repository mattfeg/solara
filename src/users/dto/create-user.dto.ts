import { Prisma } from '@prisma/client';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsEmail()
  @Length(7, 50)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  profile_img: string;
}
