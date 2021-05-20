import { CreateUserInput } from '../../user/dto/create-user.input'
import { UpdateUserInput } from '../../user/dto/update-user.input'
import { User } from './../../user/user.entity';
import { Chance } from 'chance';
import { ObjectID } from 'typeorm';

const chance = new Chance();

export const mockAddAccountParams: CreateUserInput = {
  name: chance.name(),
  email: chance.email(),
  password: chance.string()
};

export const mockUpdateUserParams: UpdateUserInput = {
  id: '1',
  email: 'email-updated@email.com',
  name:'updatedNAME',
  password:'newe password'
};

export const mockUserModel: User = {
  id: new ObjectID(),
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: new ObjectID(),
    name: 'Test User 2',
    email: 'email2@email.com',
    password: chance.string()
  },
  {
    id: new ObjectID(),
    name: 'Test User 3',
    email: 'email3@email.com',
    password: chance.string()
  },
];