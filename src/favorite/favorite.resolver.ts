import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guart';
import { CurrentUser } from 'src/auth/current.user';
import { SearchArgs } from 'src/search.args';
import { User } from 'src/user/user.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { GetFavoriteOutput } from './dto/get-favorites.output';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Resolver()
export class FavoriteResolver {
  constructor(private favoriteService: FavoriteService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => GetFavoriteOutput)
  async favorites(
    @CurrentUser() user: User,
    @Args() args: SearchArgs,
  ): Promise<any> {
    const userId = user.id.toString();

    const { field, sort, value } = args;
    const page = args.page ? args.page : 1;
    const take = args.take ? args.take : 2;

    const { favorites, totalCount } = await this.favoriteService.find(
      userId,
      field,
      sort,
      value,
      page,
      take,
    );
    return {
      data: favorites,
      totalCount,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Favorite)
  async createFavorite(
    @Args({ name: 'data', type: () => CreateFavoriteInput })
    data: CreateFavoriteInput,
  ): Promise<Favorite> {
    const favorites = await this.favoriteService.create(data);

    return favorites;
  }
}
