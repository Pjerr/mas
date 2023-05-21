import { ApiProperty } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
