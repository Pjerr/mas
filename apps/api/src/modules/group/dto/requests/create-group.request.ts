import { ApiProperty } from '@nestjs/swagger';

export class CreateGroup {
  @ApiProperty()
  name: string;
}
