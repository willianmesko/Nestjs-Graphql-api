import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@Entity()
export class Favorite {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  @Field(() => [GraphQLJSONObject])
  data: object[];
}
