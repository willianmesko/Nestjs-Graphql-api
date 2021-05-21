import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {  Entity, ObjectIdColumn, ObjectID, Column  } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  @HideField()
  password: string;
}
