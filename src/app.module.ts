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
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse';
import { CustomFileScalar } from './api/file/file.scalar';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
      resolvers: { File: CustomFileScalar },
      plugins: [useGraphQLSSE()],
    }),
    ClsModule.forRoot({
      global: true,
      guard: {
        mount: true,
        setup(cls, context) {
          const request = context.getArgByIndex<{
            req: Request & { auth0Id?: string };
          }>(2);
          if (request.req?.auth0Id) {
            cls.set('auth0Id', request.req.auth0Id);
          }
        },
      },
    }),
    ApiModule,
    IntegrationsModule,
    DomainModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
