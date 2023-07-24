import { Module } from '@nestjs/common';
import { UserApiModule } from './user/user-api.module';
import { AuthApiModule } from './auth/auth-api.module';
import { MediaApiModule } from './media/media-api.module';

@Module({
  imports: [UserApiModule, AuthApiModule, MediaApiModule],
})
export class ApiModule {}
