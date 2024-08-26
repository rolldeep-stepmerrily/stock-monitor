import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { ConfigProviderModule } from './common/config-provider/config-provider.module';
import { HttpLoggerMiddleware } from './common/middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3068),
      }),
      envFilePath: '.env',
      isGlobal: true,
      validationOptions: { abortEarly: true },
    }),
    ConfigProviderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
