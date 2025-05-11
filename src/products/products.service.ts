import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { extractKeywords } from '../utils/token';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  private products: Map<string, Product>;

  constructor(private readonly userService: UsersService) {
    this.products = new Map<string, Product>();
  }
  create(createProductDto: CreateProductDto) {
    const user = this.userService.findOne(createProductDto.UserId);
    if (!user) {
      throw new NotFoundException(`User with ID ${createProductDto.UserId} not found`);
    }
    const product = new Product(createProductDto.name, createProductDto.description, createProductDto.price, createProductDto.stock, createProductDto.UserId);
    this.products.set(product.id, product);
    return product;
  }

  findAll(): Product[] {
    return Array.from(this.products.values());
  }

  findOne(id: string): Product | null {
    const product = this.products.get(id);
    if (!product) {
      return null;
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product | null {
    const product = this.products.get(id);
    if (!product) {
      return null;
    }
    product.updateProduct(updateProductDto);
    return product;
  }

  remove(id: string): boolean {
    return this.products.delete(id);
  }

  searchByKeyword(searchString: string): Product[] {
    const searchKeywords = extractKeywords(searchString);
     const results = Array.from(this.products.values())
    .filter(product => {
      const overlap = product.keywords.filter(k => searchKeywords.includes(k));
      return overlap.length > 0;
    })
    .sort((a, b) => {
      const overlapA = a.keywords.filter(k => searchKeywords.includes(k)).length;
      const overlapB = b.keywords.filter(k => searchKeywords.includes(k)).length;
      return overlapB - overlapA;
    });
    return results;
  }

}