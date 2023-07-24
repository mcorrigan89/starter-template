import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType('User')
export class UserType
  implements Omit<User, 'auth0Id' | 'createdAt' | 'updatedAt'>
{
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => String, { nullable: true })
  givenName: string;

  @Field(() => String, { nullable: true })
  familyName: string;
}
