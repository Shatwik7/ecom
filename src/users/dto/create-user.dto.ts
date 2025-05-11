import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
