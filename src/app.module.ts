import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CategoryModule,
    PromoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
