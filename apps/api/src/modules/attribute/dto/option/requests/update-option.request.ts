import { PartialType } from '@nestjs/mapped-types';
import { CreateOption } from './create-option.request';

export class UpdateOption extends PartialType(CreateOption) {}
