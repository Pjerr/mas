import AdditionalMetadata from '@/core/types/additional-metadata';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EditorType, EditorValidation } from 'shared';

export class CreateAttribute {
  @ApiProperty()
  propertyKey?: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  @IsEnum(EditorType)
  editorType = EditorType.Text;

  @ApiProperty()
  @IsEnum(EditorValidation)
  editorValidation = EditorValidation.None;

  @ApiProperty()
  additionalMetadata?: AdditionalMetadata = { selectOptions: [] };
}
