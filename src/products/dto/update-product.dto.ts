import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateProductDto  {
    
    @IsString()    
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    stock: number;
}
