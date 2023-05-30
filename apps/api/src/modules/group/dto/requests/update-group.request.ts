import { PartialType } from '@nestjs/mapped-types';
import { CreateGroup } from './create-group.request';

export class UpdateGroup extends PartialType(CreateGroup) {}
