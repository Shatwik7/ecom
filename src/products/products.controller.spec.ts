import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';

const mockUsersService: Partial<UsersService> = {
  findOne: jest.fn().mockResolvedValue({ id: 1, name: 'John' }),
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
            ProductsService,
            { provide: UsersService, useValue: mockUsersService },
          ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    };
    const result = controller.create(createProductDto);
    expect(result).toBeDefined();
    expect(result.name).toBe('Test Product');
  });

  it('should find all products', () => {
    const result = controller.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('should find a product by ID', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    };
    const product = controller.create(createProductDto);
    const foundProduct = controller.findOne(product.id);
    expect(foundProduct).toBeDefined();
    expect(foundProduct?.name).toBe('Test Product');
  });


  it('should update a product', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    };
    const product = controller.create(createProductDto);
    const updateProductDto = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      stock: 5,
    };
    const updatedProduct = controller.update(product.id, updateProductDto);
    expect(updatedProduct).toBeDefined();
    expect(updatedProduct?.name).toBe('Updated Product');
  });


  it('should remove a product', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    };
    const product = controller.create(createProductDto);
    const result = controller.remove(product.id);
    expect(result).toBe(true);
  });

  it('should search products by keyword', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    };
    controller.create(createProductDto);
    const result = controller.searchByKeyword('Test');
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return an empty array if no products match the keyword', () => {
    const createProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      UserId: '1',
    };
    controller.create(createProductDto);
    const result = controller.searchByKeyword('Nonexistent');
    expect(result).toEqual([]);
  });

});
