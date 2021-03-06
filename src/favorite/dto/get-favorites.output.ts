import { ObjectType, Field } from '@nestjs/graphql';


import { GraphQLJSONObject } from 'graphql-type-json';
@ObjectType()
export class GetFavoriteOutput {
  @Field()
  totalCount: number;

  @Field(() => [GraphQLJSONObject])
  favorites: [object];
}
