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

  async create(userId: string, {data}: CreateFavoriteInput): Promise<Favorite> {
    let favorite: Favorite;
    favorite = await this.favoriteRepository.findOne({
      where: {
        $and: [
          {userId: { $eq: userId }},
          {"data.name": {$eq: data.name}}
        ]
       
      },
    });

    
     
      if (favorite) {
        throw new BadRequestException('Favorite already include');
      }

      favorite =  this.favoriteRepository.create(
        {userId,
          data,
        }
      )

      await this.favoriteRepository.save(favorite);

      return favorite;
  
  }

  async find(
    options: any,
    page: number,
    take: number = 2,
  ) {
    let favorites;
     favorites = await this.favoriteRepository.findAndCount({
      select: ['data'], 
    
      id: false,
      ...options,
      take,
      skip: (page - 1) * take,
        
    }, );
      const totalCount = favorites[1];
    
     favorites = favorites[0].map((fav) => fav.data);
    
   console.log(favorites)
    return {
      favorites, 
      totalCount
    }
  }
 
 
}
