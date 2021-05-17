import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { Television } from './television.entity';
import { TelevisionService } from './television.service';
import { CreateTelevisionInput } from './dto/create-television.input';
import { GetTelevisionsOutPut } from './dto/get-televisions.output';
import { SearchArgs } from 'src/search.args';

@Resolver()
export class TelevisionResolver {
  constructor(private televisionService: TelevisionService) {}

  @Query(() => GetTelevisionsOutPut)
  async televisions(@Args() args: SearchArgs): Promise<GetTelevisionsOutPut> {
    let options = {};
    const { field, sort, value } = args;
    const page = args.page ? args.page : 1;
    const take = args.take ? args.take : 3;
    if (field && value) {
      options = {
        ...options,
        where: {
          $or: [
            {
              [field]: value,
            },
          ],
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

    const [televisions, totalCount] = await this.televisionService.find(
      options,
      page,
      take,
    );

    return {
      data: televisions,
      totalCount,
    };
  }

  @Mutation(() => Television)
  async createTelevision(
    @Args('data') data: CreateTelevisionInput,
  ): Promise<Television> {
    const television = await this.televisionService.create(data);
    return television;
  }
}
