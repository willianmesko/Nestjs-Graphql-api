import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from 'src/helpers/crypto';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

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
