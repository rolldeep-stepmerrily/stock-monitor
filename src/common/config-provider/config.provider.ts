import { ConfigService } from '@nestjs/config';

const createConfigProvider = <T>(key: string, type: 'string' | 'number' = 'string') => {
  return {
    provide: key,
    useFactory: (configService: ConfigService) => {
      const value = configService.getOrThrow<T>(key);
      return type === 'number' ? Number(value) : value;
    },
    inject: [ConfigService],
  };
};

export const SERVER_URL_PROVIDER = createConfigProvider<string>('SERVER_URL');
export const NODE_ENV_PROVIDER = createConfigProvider<string>('NODE_ENV');
export const PORT_PROVIDER = createConfigProvider<number>('PORT', 'number');
export const KIS_KEY_PROVIDER = createConfigProvider<string>('KIS_KEY');
export const KIS_SECRET_PROVIDER = createConfigProvider<string>('KIS_SECRET');
