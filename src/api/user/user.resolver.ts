import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.dto';
import { UserService } from 'src/domain/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => UserType)
  async user(@Args('id', { type: () => String }) id: string) {
    return {
      id,
      name: 'John Doe',
    };
  }

  @Query(() => UserType)
  async me() {
    const user = await this.userService.getCurrentUser();
    return {
      id: user?.user_id,
      name: user?.name ?? 'No Name',
    };
  }
}

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imhtc3lkbUl5TWx2R2M3N2N6ck9SZyJ9.eyJpc3MiOiJodHRwczovL2Rldi0yeTVqcXh5d25senE0NDN5LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJiWXBVN3A0Zmg2TUxRaWJORGRvNnA4MldRT1hBNWlaaiIsImlhdCI6MTY5MDIxMDY3OSwiZXhwIjoxNjkwMjQ2Njc5LCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDkyMzQ3MTAxMTQ5OTY2NDUzOSIsInNpZCI6IkxsSHJUOWVBd2tTZFluc0tBbDRWNkc4ZUNPcnUzdUFoIn0.VitL8xUmh_59SsdlnabbsXBhvN6NwoELocEgc6xD9J_-uSn87sCACK5CPPVxPh97TqQ5WP_71Vj6nGtHa90KJBY-NZZUXYLK7fRWD1LCIgfiVunCM3YK5Sfa14UAbSoeNcfUQDHESuyGCZkI1jzB02kDZ8hSMXTYJsRvVBITcN1YHThoDLFrxVfirD6uKfyQD5O6tQyFDCPnuCpwi2AF4UyKYof1gra6KNjipGuyTeOlmlMZhmK1O8qj0wJOPyU_8Fdy7r5PLSeR4tkb14C4IYLTs6MqeAwUtHrq-1zXkZ99LKEErlXtISHtmvum3jZOmivfZE18TQ1noT0qHuyQsQ
