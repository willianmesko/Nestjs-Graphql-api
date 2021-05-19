import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class DeleteFavoriteInput {
  @IsNotEmpty({ message: 'product name is required' })
  @Field()
  productName: string;
}
