import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ClsModule } from 'nestjs-cls';
import { Request } from 'express';
import { DomainModule } from './domain/domain.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
    }),
    ClsModule.forRoot({
      global: true,
      guard: {
        mount: true,
        setup(cls, context) {
          const request = context.getArgByIndex<{
            req: Request & { auth0Id?: string };
          }>(2);
          if (request.req.auth0Id) {
            cls.set('auth0Id', request.req.auth0Id);
          }
        },
      },
    }),
    ApiModule,
    IntegrationsModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
