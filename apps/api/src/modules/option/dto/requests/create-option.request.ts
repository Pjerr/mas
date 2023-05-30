import { ApiProperty } from '@nestjs/swagger';

export class CreateOption {
  @ApiProperty()
  value: string;
  @ApiProperty()
  displayName: string;
  @ApiProperty()
  attributeId: string;
  @ApiProperty()
  additionalPrice: number;
  @ApiProperty()
  sku: string;
}
