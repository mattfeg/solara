import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.create(createFollowDto);
  }

  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.followsService.findAllByUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(id);
  }
}
