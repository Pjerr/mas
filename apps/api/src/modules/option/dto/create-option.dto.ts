import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
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
