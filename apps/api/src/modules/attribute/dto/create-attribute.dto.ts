import AdditionalMetadata from '@/core/types/additional-metadata';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EditorType, EditorValidation } from 'shared';

export class CreateAttributeDto {
  @ApiProperty()
  propertyKey?: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  @IsEnum(EditorType)
  editorType: EditorType = EditorType.Text;

  @ApiProperty()
  @IsEnum(EditorValidation)
  editorValidation: EditorValidation = EditorValidation.None;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  additionalMetadata?: AdditionalMetadata = { selectOptions: [] };
}
