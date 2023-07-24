import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { Auth0Module } from 'src/integrations/auth0/auth0.module';
import { AuthMiddleware } from './auth.middleware';
import { UserModule } from 'src/domain/user/user.module';

@Module({
  imports: [Auth0Module, UserModule],
  providers: [AuthResolver],
})
export class AuthApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
