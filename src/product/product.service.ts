import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create-product-input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(  @InjectRepository(Product)
    private productRepository: MongoRepository<Product>) {

    }

   

    async create(createProducInput: CreateProductInput) : Promise<Product> {
    
      const product = this.productRepository.create(createProducInput);
      await this.productRepository.save(product);

      return product;
    }

    async getAll(options?: any, page?: number, take?: number) : Promise<any> {
        let products;
        let totalCount;
      console.log(options)
         products = await this.productRepository.findAndCount({
            ...options,
            take,
            skip: (page - 1) * take,
        });
 
  totalCount = products[1];     
   products = products[0].map(product => product.product)
   
   
        return {
            products,
            totalCount
        }
      }
}
