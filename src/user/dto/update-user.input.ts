import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @IsOptional()
  password: string;
}
