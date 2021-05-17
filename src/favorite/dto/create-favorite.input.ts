import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Game } from 'src/games/game.entity';
import { Television } from 'src/television/television.entity';
import { Favorite } from '../favorite.entity';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ObjectID } from 'typeorm';
@InputType()
export class CreateFavoriteInput {
  @IsNotEmpty({ message: 'favorites is required' })
  @Field(() => GraphQLJSONObject)
  data: Game | Television;

  @IsString()
  userId: string;
}
