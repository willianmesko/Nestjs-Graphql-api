import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  @Mutation(() => User)
  async UpdateUser(
    @Args('data') data: UpdateUserInput,
    @Args('id') id: string,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, data);

    return user;
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);

    return user;
  }
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUser();

    return users;
  }
}
