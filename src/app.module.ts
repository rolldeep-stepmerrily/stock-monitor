import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { HttpModule } from '@nestjs/axios';

import { ConfigProviderModule } from './common/config-provider/config-provider.module';
import { HttpLoggerMiddleware } from './common/middlewares';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3068),
        KIS_KEY: Joi.string().required(),
        KIS_SECRET: Joi.string().required(),
      }),
      envFilePath: '.env',
      isGlobal: true,
      validationOptions: { abortEarly: true },
    }),
    ConfigProviderModule,
    StocksModule,
    HttpModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
