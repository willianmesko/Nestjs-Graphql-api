import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ProductService } from './product/product.service';
import seeds from './seed';
@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly productService: ProductService) {}

  async onApplicationBootstrap() {
    try {
      const { _, totalCount } = await this.productService.getAll();
      if (totalCount === 0) {
        this.logger.log('Seeding product collection');
        seeds.map(
          async seed =>
            await this.productService.create({
              department: seed.department,
              product: seed.product,
            }),
        );
        this.logger.log('Seeding finish');
      }
    } catch (error) {
      this.logger.error(
        `Error on seeding products collection ${JSON.stringify(error)}`,
      );
    }
  }
}
