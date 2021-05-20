import { CreateUserInput } from '../../user/dto/create-user.input'
import { UpdateUserInput } from '../../user/dto/update-user.input'
import { User } from './../../user/user.entity';

import { ObjectID } from 'typeorm';



export const mockAddAccountParams: CreateUserInput = {
  name: 'user',
  email: 'user@example.com',
  password: '123456',
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
    password: '123456'
  },
  {
    id: new ObjectID(),
    name: 'Test User 3',
    email: 'email3@email.com',
    password: '123456'
  },
];