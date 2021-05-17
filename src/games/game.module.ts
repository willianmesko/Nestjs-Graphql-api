import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService, GameResolver],
})
export class GameModule {}
