import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

import { GraphQLJSONObject } from 'graphql-type-json';
import { Game } from '../entities/game.entity';
import { Television } from '../entities/television.entity';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty({ message: 'department is required' })
  @Field()
  department: string;

  @IsObject()
  @IsNotEmpty({ message: 'Data is required' })
  @Field(() => GraphQLJSONObject)
  product: object

 
}
