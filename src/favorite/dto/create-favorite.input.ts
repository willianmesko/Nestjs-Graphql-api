import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';


import { GraphQLJSONObject } from 'graphql-type-json';

import { Game } from 'src/product/entities/game.entity';
import { Television } from 'src/product/entities/television.entity';
@InputType()
export class CreateFavoriteInput {
  @IsNotEmpty({ message: 'favorites is required' })
  @Field(() => GraphQLJSONObject)
  product: Game | Television

 
}
