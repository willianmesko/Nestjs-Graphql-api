import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Price is required' })
  price: string;

  @IsString()
  @IsNotEmpty({ message: 'Price is required' })
  rating: string;

  @IsString()
  @IsNotEmpty({ message: 'reviewCount is required' })
  reviewCount: string;

  @IsString()
  @IsNotEmpty({ message: 'imageUrl is required' })
  imageUrl: string;

  @IsString()
  @IsNotEmpty({ message: 'memory is required' })
  memory: string;

  @IsString()
  @IsNotEmpty({ message: 'conditions is required' })
  condition: string;
}
