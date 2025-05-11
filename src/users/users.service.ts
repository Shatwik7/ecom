import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users:Map<string, User>;

  constructor() {
    this.users= new Map<string, User>();
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.name, createUserDto.email, createUserDto.password);
    this.users.set(user.id, user);
    return user;
  }

  findAll() {
    return Array.from(this.users.values());
  }

  findOne(id: string) {
    return this.users.get(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }
    user.updateUser(updateUserDto);
    return user;
  }

  remove(id: string) {
    const user=this.users.get(id);
    if (!user) {
      return null;
    }
    this.users.delete(id);
    return user;
  }

  findByEmail(email: string) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }
}
