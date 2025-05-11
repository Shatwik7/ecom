
export class User {
    name: string;
    email: string;
    password: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    Products: Set<string>;



    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = crypto.randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.Products = new Set<string>();
    }
    
    updateUser(updateUserDto: { name?: string; email?: string }) {
        if (updateUserDto.name) {
            this.name = updateUserDto.name;
        }
        if (updateUserDto.email) {
            this.email = updateUserDto.email;
        }
        this.updatedAt = new Date();
    }

    addProduct(productId: string) {
        this.Products.add(productId);
    }

}
