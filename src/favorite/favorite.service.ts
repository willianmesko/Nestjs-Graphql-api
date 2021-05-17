import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/games/game.entity';
import { Television } from 'src/television/television.entity';
import { MongoRepository } from 'typeorm';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: MongoRepository<Favorite>,
  ) {}

  async create(data: CreateFavoriteInput): Promise<Favorite> {
    let favorite: Favorite;
    favorite = await this.favoriteRepository.findOne({
      where: {
        userId: { $eq: data.userId },
      },
    });

    if (favorite) {
      const existFavorite = favorite.data.find(
        (f: Game | Television) => f.id === data.data.id,
      );

      if (existFavorite) {
        throw new BadRequestException('Favorite already include');
      }

      favorite.data.push(data.data);

      await this.favoriteRepository.save(favorite);

      return favorite;
    }

    favorite = this.favoriteRepository.create({
      userId: data.userId,
      data: [data.data],
    });
    await this.favoriteRepository.save(favorite);

    return favorite;
  }

  async find(
    userId: string,
    field: string,
    sort: string,
    value: string | number,
    page: number,
    take: number = 2,
  ) {
    let favorites;
    const pageStart = (Number(page) - 1) * Number(take);
    const pageEnd = pageStart + Number(take);
    let sortBy = {};
    let match = {
      userId,
    };
    sortBy = {
      'data.name': 'ASC',
    };
    if (field && value) {
      match = {
        ...match,
        [field]: {
          $eq: value,
        },
      };
    }
    if (field && sort) {
      sortBy = {
        [field]: sort,
      };
    }
    const totalCount = await (await this.favoriteRepository.findOne({ userId }))
      .data.length;

    favorites = await this.favoriteRepository
      .aggregate([
        { $unwind: '$data' },
        {
          $match: match,
        },
        { $project: { data: 1, _id: 0 } },
      ])
      .toArray();

    favorites =
      field && value
        ? favorites.length > 0
          ? [favorites[0].data]
          : []
        : favorites.map(f => f.data);
    favorites = favorites.slice(pageStart, pageEnd);
    return {
      favorites,
      totalCount,
    };
  }
}
