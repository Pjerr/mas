import { ApiProperty } from '@nestjs/swagger';

export class CreateManufacturer {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
