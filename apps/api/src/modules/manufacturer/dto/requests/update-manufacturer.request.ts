import { PartialType } from '@nestjs/mapped-types';
import { CreateManufacturer } from './create-manufacturer.request';

export class UpdateManufacturer extends PartialType(CreateManufacturer) {}
