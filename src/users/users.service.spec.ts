import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const user = service.create({
      name: 'Test User',
      email: 'Test User',
      password: 'Test User',
    });
    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');
  });

  it('should find all users', () => {
    service.findAll();
    expect(service.findAll()).toBeDefined();
  });

  it('should find a user by ID', () => {
    const user = service.create({
      name: 'Test User',
      email: 'Test User',
      password: 'Test User',
    });
    const foundUser = service.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe('Test User');
  });

});
