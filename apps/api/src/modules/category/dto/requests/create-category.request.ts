import { ApiProperty } from '@nestjs/swagger';

export class CreateCategory {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentId?: string;
  @ApiProperty()
  childrenIds?: string[] = [];
}
