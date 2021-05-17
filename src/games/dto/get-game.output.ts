import { ObjectType, Field } from '@nestjs/graphql';
import { Game } from '../game.entity';

@ObjectType()
export class GetGameOutput {
  @Field(() => [Game])
  data: Game[];
  @Field()
  totalCount: number;
}
