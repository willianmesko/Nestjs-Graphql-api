import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class GetProductsOutput {
  @Field(() => [GraphQLJSONObject])
  products: object[];
  @Field()
  totalCount: number;
}
