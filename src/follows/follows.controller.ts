import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post(':id')
  create(@Param('id') userId: string, @Body() data: { followingId: string }) {
    return this.followsService.create(userId, data.followingId);
  }

  @Get()
  findAll() {
    return this.followsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followsService.findOne(id);
  }

  @Get('user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.followsService.findAllByUser(id);
  }

  @Get('user/followers/:id')
  findAllFollowersByUser(@Param('id') id: string) {
    return this.followsService.findAllFollowersByUser(id);
  }

  @Get('user/followings/:id')
  findAllFollowingsByUser(@Param('id') id: string) {
    return this.followsService.findAllFollowingsByUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(id);
  }
}
