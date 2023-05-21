import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CarStatus } from 'shared';

export class CreateCarDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEnum(CarStatus)
  status?: CarStatus = CarStatus.InStock;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  attributeIds: string;
}
