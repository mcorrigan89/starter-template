import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUserService } from './current-user.service';
import { ClsModule } from 'nestjs-cls';
import { Auth0Module } from 'src/integrations/auth0/auth0.module';

@Module({
  imports: [ClsModule, Auth0Module],
  providers: [UserService, CurrentUserService],
  exports: [UserService],
})
export class UserModule {}
