import { PartialType } from '@nestjs/mapped-types';
import { CreatePart } from './create-part.request';

export class UpdatePart extends PartialType(CreatePart) {}
