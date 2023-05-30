import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroup } from './dto/requests/create-group.request';
import { UpdateGroup } from './dto/requests/update-group.request';
import { ApiTags } from '@nestjs/swagger';
import {
  GroupRelationTypes,
  GroupResponse,
  GroupsResponse,
  QueryGroup,
} from './dto';
import { FilterQuery } from '@/core/types';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { Group } from '@/core/entities';
import { filterEntity } from '@/core/utils/parse-query';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() payload: CreateGroup): Promise<GroupResponse> {
    const response = await this.groupService.create(payload);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryGroup)
  async findAll(
    @Query('query', QueryPipe<GroupRelationTypes, Group>) query: QueryGroup,
  ): Promise<GroupsResponse> {
    const filter = filterEntity<GroupRelationTypes, Group>(query, Group);
    const response = await this.groupService.find(filter);
    return { data: response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroupResponse> {
    const response = await this.groupService.findOne(id);
    return { data: response };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateGroup,
  ): Promise<GroupResponse> {
    const response = await this.groupService.update(id, payload);
    return { data: response };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
