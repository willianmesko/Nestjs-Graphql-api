import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Game } from 'src/games/game.entity';
import { Television } from 'src/television/television.entity';
import { ObjectID } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';
@ObjectType()
export class GetFavoriteOutput {
  @Field()
  totalCount: number;

  @Field(() => [GraphQLJSONObject])
  data: [object];
}
