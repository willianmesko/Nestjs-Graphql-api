import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTelevisionInput {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Price is required' })
  rating: number;

  @IsNumber()
  @IsNotEmpty({ message: 'reviewCount is required' })
  reviewCount: number;

  @IsString()
  @IsNotEmpty({ message: 'imageUrl is required' })
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty({ message: 'inch is required' })
  inch: number;

  @IsString()
  @IsNotEmpty({ message: 'resolution is required' })
  resolution: string;
}
