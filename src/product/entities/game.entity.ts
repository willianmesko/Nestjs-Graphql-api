import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Game {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  name: string;
  @Column()
  price: string;
  @Column()
  reviewCount: string;

  @Column()
  rating: string;
  @Column()
  imageUrl: string;
  @Column()
  memory: string;
  @Column()
  condition: string;
}
