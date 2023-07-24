import { Module } from '@nestjs/common';
import { UserApiModule } from './user/user-api.module';
import { AuthApiModule } from './auth/auth-api.module';

@Module({
  imports: [UserApiModule, AuthApiModule],
})
export class ApiModule {}
