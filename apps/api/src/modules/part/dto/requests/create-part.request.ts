import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PartStatus, PropertyType } from 'shared';

export class CreatePart {
  @ApiProperty()
  @IsEnum(PartStatus)
  status?: PartStatus = PartStatus.OutOfStock;

  @ApiProperty()
  name: string;

  @ApiProperty()
  manufacturerId?: string;

  @ApiProperty()
  categoryId?: string;

  @ApiProperty()
  attributeIds?: string[];

  @ApiProperty()
  properties?: PropertyType;

  @ApiProperty()
  basePrice: number = 0;
}
