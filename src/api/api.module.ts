import { Module } from '@nestjs/common';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [],
  providers: [UserResolver],
})
export class ApiModule {}
