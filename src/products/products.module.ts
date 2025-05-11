import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
})
export class ProductsModule {}
