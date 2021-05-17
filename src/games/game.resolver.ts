import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { GetGameOutput } from './dto/get-game.output';
import { GameArgs } from './game.args';

import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver(of => Game)
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => GetGameOutput)
  async games(@Args() args: GameArgs): Promise<GetGameOutput> {
    let options = {};
    const { field, sort, value } = args;
    const page = args.page ? args.page : 1;
    const take = args.take ? args.take : 3;
    if (field && value) {
      options = {
        ...options,
        where: {
          [field]: value,
        },
      };
    }

    if (field && sort) {
      options = {
        ...options,
        order: {
          [field]: sort.toLocaleUpperCase(),
        },
      };
    }
    const [games, totalCount] = await this.gameService.find(
      options,
      page,
      take,
    );

    return {
      data: games,
      totalCount,
    };
  }
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const game = await this.gameService.create(data);
    return game;
  }
}
