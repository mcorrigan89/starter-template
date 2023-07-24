import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUserService } from './current-user.service';
import { ClsModule } from 'nestjs-cls';
import { Auth0Module } from 'src/integrations/auth0/auth0.module';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ClsModule, Auth0Module, PrismaModule],
  providers: [UserService, CurrentUserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
