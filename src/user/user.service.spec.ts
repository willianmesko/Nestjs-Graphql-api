import {NotFoundException} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  mockAddAccountParams,
  mockUpdateUserParams,
  mockUpdatedUserModel,
  mockUserModel,
  mockUserArrayModel,
  mockId
} from '../common/test/TestUtil';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockUserArrayModel),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn().mockReturnValue(mockUserModel),
    save: jest.fn().mockReturnValue(mockUserModel),
    update: jest.fn().mockReturnValue(mockUpdatedUserModel),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all Users', () => {
    it('Should list all users', async () => {
      const users = service.findAllUsers();

      expect(users).resolves.toBe(mockUserArrayModel);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search User By Id', () => {
    it('Should find a existing user', async () => {
      const userFound = service.findById(mockId);

      expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
      expect(userFound).resolves.toBe(mockUserModel);
    });
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const user = service.findById('3');

      expect(user).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith('3');
    });
  });

  describe('When create a user', () => {
    it.only('Should create a user', async () => {
      const user = service.createUser(mockAddAccountParams);

      mockRepository.findOne = jest.fn().mockResolvedValue(undefined);

      expect(mockRepository.create).toBeCalledWith(mockAddAccountParams);
      expect(mockRepository.save).toBeCalledTimes(1);
      expect(user).resolves.toBe(mockUserModel);
    });
  });

  describe('When update User', () => {
    it('Should update a user', async () => {
      service.findById = jest.fn().mockReturnValueOnce(mockUserModel);

      const userUpdated = service.updateUser(mockUpdateUserParams);

      expect(service.findById).toHaveBeenCalledWith(mockUpdateUserParams.id);
      expect(userUpdated).resolves.toBe(mockUpdatedUserModel);
    });
  });
});