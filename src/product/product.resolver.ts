import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { SearchArgs } from 'src/search.args';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product-input';
import { ProductService } from './product.service';
import { GetProductsOutput } from './dto/get-products-output';
@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => GetProductsOutput)
  async products(@Args() args: SearchArgs): Promise<GetProductsOutput> {
    let options = {};
    const { field, sort, value, department } = args;
    const page = args.page ? args.page : 1;
    const take = args.take ? args.take : 3;

    options = {
      where: {
        department,
      },
    };
    if (field && value) {
      options = {
        where: {
          department,

          [field]: { $eq: value },
        },
      };
    }
    

    if (field && sort) {
      options = {
        ...options,
        order: {
          [field]: sort.toLocaleUpperCase(),
        },
      };
    }

    const { products, totalCount } = await this.productService.getAll(
      options,
      page,
      take,
    );

    return {
      products,
      totalCount,
    };
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    const product = await this.productService.create(data);
    return product;
  }
}
