import { PartialType } from '@nestjs/swagger';
import { CreateAttribute } from './create-attribute.request';

export class UpdateAttribute extends PartialType(CreateAttribute) {}
