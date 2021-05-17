import { Module } from '@nestjs/common';
import { TelevisionService } from './television.service';
import { TelevisionResolver } from './television.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Television } from './television.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Television])],
  providers: [TelevisionService, TelevisionResolver],
})
export class TelevisionModule {}
