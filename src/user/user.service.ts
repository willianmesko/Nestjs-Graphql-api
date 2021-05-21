import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPasswordTransform } from '../common/transformers/crypto-transform';
import {  Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { ObjectID } from 'mongodb';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    let user;
    user = await this.userRepository.findOne({
      where: {
        email: { $eq: data.email },
      },
    });

    if (user) {
      throw new BadRequestException('User already exist');
    }
    user = this.userRepository.create(data);
    user.password = hashPasswordTransform.to(data.password);
    await this.userRepository.save(user);

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async findById(id: string): Promise<User> {
  
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async updateUser(data: UpdateUserInput): Promise<User> {
    const user = await this.findById(data.id);

    await this.userRepository.update(user, { ...data });

    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: { $eq: email },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
