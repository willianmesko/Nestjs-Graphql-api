import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

import { GraphQLJSONObject } from 'graphql-type-json';
import { Game } from '../entities/game.entity';
import { Television } from '../entities/television.entity';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty({ message: 'Departament is required' })
  @Field()
  departament: string;

  @IsObject()
  @IsNotEmpty({ message: 'Data is required' })
  @Field(() => GraphQLJSONObject)
  product: Game | Television

 
}
