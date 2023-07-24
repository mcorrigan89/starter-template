import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SignInToken } from 'auth0';

@ObjectType('SignInToken')
export class SignInTokenType implements SignInToken {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;

  @Field(() => String)
  id_token: string;

  @Field(() => String)
  scope: string;

  @Field(() => Int)
  expires_in: number;

  @Field(() => String)
  token_type: string;
}
