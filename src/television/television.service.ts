import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTelevisionInput } from './dto/create-television.input';
import { PerchQueryBuilder } from 'perch-query-builder';
import { Television } from './television.entity';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export class TelevisionService {
  constructor(
    @InjectRepository(Television)
    private televisionRepository: Repository<Television>,
  ) {}

  async findAll(): Promise<Television[]> {
    const televisions = await this.televisionRepository.find();

    return televisions;
  }

  async create(data: CreateTelevisionInput): Promise<Television> {
    const television = this.televisionRepository.create(data);

    await this.televisionRepository.save(television);

    return television;
  }

  async find(
    options: any,
    page: number,
    take: number,
  ): Promise<[Television[], number]> {
    return this.televisionRepository.findAndCount({
      ...options,
      take,
      skip: (page - 1) * take,
    });
  }
}
