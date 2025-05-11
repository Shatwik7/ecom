import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto = {
      name: 'Test User',
      email: '  Test User',
      password: 'Test User', 
    };
    const result = controller.create(createUserDto);
    expect(result).toBeDefined();
    expect(result.name).toBe('Test User');
  });

  it('should find all users', () => {
    const result = controller.findAll();
    expect(result).toBeDefined();
  });

  it('should find a user by ID', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'Test User',
      password: 'Test User',
    };
    const user = controller.create(createUserDto);
    const foundUser = controller.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe('Test User');
  });

  it('should update a user', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'Test User',
      password: 'Test User',
    };
    const user = controller.create(createUserDto);
    const updateUserDto = {
      name: 'Updated User',
      email: 'Updated User',
      password: 'Updated User',
    };
    const updatedUser = controller.update(user.id, updateUserDto);
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.name).toBe('Updated User');
  });


  it('should remove a user', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'Test User',
      password: 'Test User',
    };
    const user = controller.create(createUserDto);
    const removedUser = controller.remove(user.id);
    expect(removedUser).toBeDefined();
    expect(removedUser?.name).toBe('Test User');
  });
});
