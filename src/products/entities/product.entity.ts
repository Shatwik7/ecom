import { UpdateProductDto } from "../dto/update-product.dto";
import { extractKeywords } from "../../utils/token";

export class Product {
    name: string;
    description: string;
    price: number;
    id: string;
    stock: number;
    keywords: string[];                                                     
    UserId: string;
    createdAt: Date;
    updatedAt: Date;


    constructor(name: string, description: string, price: number, stock: number, UserId:string , generateKeywoerds:boolean = true) {
        this.UserId = UserId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.id = crypto.randomUUID();
        this.stock = stock;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        if(generateKeywoerds) {
            this.generateKeywords();
        }
    }

    updateProduct(updateProductDto:UpdateProductDto) {
        this.name = updateProductDto.name || this.name;
        this.description = updateProductDto.description || this.description;
        this.price = updateProductDto.price || this.price;
        this.stock = updateProductDto.stock || this.stock;
        this.updatedAt = new Date();
    }

    generateKeywords() {
        const nameKeywords = extractKeywords(this.name);
        const descriptionKeywords = extractKeywords(this.description);
        this.keywords = [...nameKeywords, ...descriptionKeywords];
    }
    
}

