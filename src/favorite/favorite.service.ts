import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MongoRepository } from 'typeorm';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: MongoRepository<Favorite>,
  ) {}

  async create(userId: string, {product}: CreateFavoriteInput): Promise<Favorite> {
    let favorite: Favorite;
    console.log(product)
    favorite = await this.favoriteRepository.findOne({
      where: {
       
         userId: { $eq: userId },
         "product.name": {$eq: product.name}
       
       
      },
    });

    
      if (favorite) {
        throw new BadRequestException('Favorite already include');
      }

      favorite =  this.favoriteRepository.create(
        {userId,
          product,
        }
      )

      await this.favoriteRepository.save(favorite);

      return favorite;
  
  }

  async getAll(
    options: any,
    page: number,
    take: number,
  ) {
    let favorites;
   
     favorites = await this.favoriteRepository.findAndCount({
      select: ['product'], 
    
      id: false,
      ...options,
      take,
      skip: (page - 1) * take,
        
    }, );
      const totalCount = favorites[1];
    
     favorites = favorites[0].map((fav) => fav.product);
  console.log("RATING", favorites);
   
    return {
      favorites, 
      totalCount
    }
  }
 
 
}
