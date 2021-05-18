import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Game } from './game.entity';
import { Television } from './television.entity';

@ObjectType()
@Entity()
export class Product {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  @Field()
  department: string;

  @Column()
  @Field(() => GraphQLJSONObject)
  product: Game | Television

}
