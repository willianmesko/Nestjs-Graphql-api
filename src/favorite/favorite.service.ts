import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { DeleteFavoriteInput } from './dto/delete-favorite.input';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: MongoRepository<Favorite>,
  ) {}

  async createFavorite(
    userId: string,
    { product }: CreateFavoriteInput,
  ): Promise<Favorite> {
    let favorite: Favorite;

    favorite = await this.findOne(userId, product.name);

    if (favorite) {
      return favorite;
    }

    favorite = this.favoriteRepository.create({ userId, product });

    await this.favoriteRepository.save(favorite);

    return favorite;
  }
  async deleteFavorite(userId: string, productName: string): Promise<Favorite> {
    const favorite = await this.findOne(userId, productName);

    const deletedFavorite = await this.favoriteRepository.delete(favorite);
    if (deletedFavorite) {
      return favorite;
    }
  }
  async getAll(options: any, page: number, take: number) {
    let favorites;
 
    favorites = await this.favoriteRepository.findAndCount({
      select: ['product'],
      ...options,
      take,
      skip: (page - 1) * take,
    });
    const totalCount = favorites[1];

    favorites = favorites[0].map(fav => fav.product);

    return {
      favorites,
      totalCount,
    };
  }

  async findOne(userId: string, productName: string): Promise<Favorite> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        userId: { $eq: userId },
        'product.name': { $eq: productName },
      },
    });

    return favorite;
  }
}
