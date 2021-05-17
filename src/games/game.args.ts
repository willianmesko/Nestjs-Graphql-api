import { ArgsType } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ArgsType()
export class GameArgs {
  sort?: string;
  field?: string;
  take?: number;
  page?: number;
  @Field(() => String || Number)
  value?: string | number;
}
