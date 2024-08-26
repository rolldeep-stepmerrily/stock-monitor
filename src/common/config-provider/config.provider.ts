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
export const ADMIN_NAME_PROVIDER = createConfigProvider<string>('ADMIN_NAME');
export const ADMIN_PASSWORD_PROVIDER = createConfigProvider<string>('ADMIN_PASSWORD');
export const DATABASE_URL_PROVIDER = createConfigProvider<string>('DATABASE_URL');
export const SECRET_KEY_PROVIDER = createConfigProvider<string>('SECRET_KEY');
export const JWT_SECRET_KEY_PROVIDER = createConfigProvider<string>('JWT_SECRET_KEY');
export const MOBILIANS_SERVICE_ID_PROVIDER = createConfigProvider<string>('MOBILIANS_SERVICE_ID');
export const MOBILIANS_SITE_URL_PROVIDER = createConfigProvider<string>('MOBILIANS_SITE_URL');
export const MOBILIANS_DI_CODE_PROVIDER = createConfigProvider<string>('MOBILIANS_DI_CODE');
export const MOBILIANS_SECRET_KEY_PROVIDER = createConfigProvider<string>('MOBILIANS_SECRET_KEY');
export const NAVER_CLIENT_ID_PROVIDER = createConfigProvider<string>('NAVER_CLIENT_ID');
export const NAVER_CLIENT_SECRET_PROVIDER = createConfigProvider<string>('NAVER_CLIENT_SECRET');
export const APPLE_CLIENT_ID_PROVIDER = createConfigProvider<string>('APPLE_CLIENT_ID');
export const APPLE_CLIENT_SECRET_PROVIDER = createConfigProvider<string>('APPLE_CLIENT_SECRET');
export const AWS_REGION_PROVIDER = createConfigProvider<string>('AWS_REGION');
export const AWS_ACCESS_KEY_ID_PROVIDER = createConfigProvider<string>('AWS_ACCESS_KEY_ID');
export const AWS_SECRET_ACCESS_KEY_PROVIDER = createConfigProvider<string>('AWS_SECRET_ACCESS_KEY');
export const AWS_S3_BUCKET_PROVIDER = createConfigProvider<string>('AWS_S3_BUCKET');
export const AWS_CLOUDFRONT_DOMAIN_PROVIDER = createConfigProvider<string>('AWS_CLOUDFRONT_DOMAIN');
export const REDIS_HOST_PROVIDER = createConfigProvider<string>('REDIS_HOST');
export const REDIS_PASSWORD_PROVIDER = createConfigProvider<string>('REDIS_PASSWORD');
export const REDIS_PORT_PROVIDER = createConfigProvider<number>('REDIS_PORT', 'number');
export const FIREBASE_CUSTOMER_ACCESS_KEY_PROVIDER = createConfigProvider<string>('FIREBASE_CUSTOMER_ACCESS_KEY');
export const CUSTOMER_APP_DEEP_LINK_PROVIDER = createConfigProvider<string>('CUSTOMER_APP_DEEP_LINK');
export const FRONTEND_URL_PROVIDER = createConfigProvider<string>('FRONTEND_URL');
