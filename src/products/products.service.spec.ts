import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';

const mockUsersService: Partial<UsersService> = {
  findOne: jest.fn().mockResolvedValue({ id: 1, name: 'John' }),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
          providers: [
      ProductsService,
      { provide: UsersService, useValue: mockUsersService },
    ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', () => {
    const product = service.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    });
    expect(product).toBeDefined();
    expect(product.name).toBe('Test Product');
  });

  it('should find all products', () => {
    service.findAll();
    expect(service.findAll()).toBeInstanceOf(Array);
  });

  it('should find a product by ID', () => {
    const product = service.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    });
    const foundProduct = service.findOne(product.id);
    expect(foundProduct).toBeDefined();
    expect(foundProduct?.name).toBe('Test Product');
  });

})
