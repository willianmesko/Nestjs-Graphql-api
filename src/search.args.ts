import { ArgsType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';

@ArgsType()
export class SearchArgs {
  sort?: string;
  field?: string;
  @Field(() => String || Number)
  value?: string | number;
  take?: number;
  page?: number;
  department?: string;
}
