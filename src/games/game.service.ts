import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';

import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async find(
    options: any,
    page: number,
    take: number,
  ): Promise<[Game[], number]> {
    const games = await this.gamesRepository.findAndCount({
      ...options,
      take,
      skip: (page - 1) * take,
    });

    return games;
  }

  async create(data: CreateGameInput): Promise<Game> {
    const game = this.gamesRepository.create(data);

    await this.gamesRepository.save(game);

    return game;
  }
}
