import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Television {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  @Field()
  name: string;
  @Column()
  @Field()
  price: number;
  @Column()
  @Field()
  reviewCount: number;

  @Column()
  @Field()
  rating: number;
  @Column()
  @Field()
  imageUrl: string;
  @Column()
  @Field()
  inch: number;
  @Column()
  @Field()
  resolution: string;
}
