import { ObjectType, Field } from '@nestjs/graphql';
import { Television } from '../television.entity';

@ObjectType()
export class GetTelevisionsOutPut {
  @Field(() => [Television])
  data: Television[];
  @Field()
  totalCount: number;
}
