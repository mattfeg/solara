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

  // TODO: Correct validate address to Address Type model
  // @IsString()
  // @IsOptional()
  // address: string;

  // TODO: Change the validation loc profile_img to the ProfileDTO
  // @IsString()
  // @IsOptional()
  // profile_img: string;
}
