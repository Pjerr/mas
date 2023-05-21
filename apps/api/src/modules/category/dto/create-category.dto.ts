import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentId: string;
  @ApiProperty()
  childrenIds?: string[] = [];
}
