import { CreateOption } from '@/modules/option/dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOption extends PartialType(CreateOption) {}
