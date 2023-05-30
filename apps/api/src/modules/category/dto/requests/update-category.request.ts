import { PartialType } from '@nestjs/mapped-types';
import { CreateCategory } from './create-category.request';

export class UpdateCategory extends PartialType(CreateCategory) {}
