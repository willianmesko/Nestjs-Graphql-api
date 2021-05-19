import { ArgsType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';

@ArgsType()
export class SearchArgs {
  sort?: string;
  field?: string;
  value?: string;
  take?: number;
  page?: number;
  department?: string;
}
