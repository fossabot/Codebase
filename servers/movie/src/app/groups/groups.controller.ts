import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UseAuth } from '../decorators/guard';
import { GroupsService } from './groups.service';

@Controller('groups')
@UseAuth('jwt')
export class GroupsController {
  constructor(private readonly group: GroupsService) {}

  // @Get()
  // async getUserGroup(@Req() req: unkown) {
  //   const data = await this;
  // }

  @Get('all')
  async getAllGroups(@Req() req: { user: { id: string } }) {
    return await this.group.getAll(req.user.id);
  }

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    return await this.group.getById(id);
  }

  @Post()
  async createGroup(
    @Query('name') name: string,
    @Req() req: { user: { id: string } },
  ) {
    return await this.group.createGroup(name, req.user?.id);
  }
}
