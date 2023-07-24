import {
  Field,
  Int,
  InterfaceType,
  ObjectType,
  createUnionType,
} from '@nestjs/graphql';

@InterfaceType()
export abstract class ErrorType {
  @Field(() => Int)
  code: number;

  @Field(() => String)
  message: string;

  @Field(() => String)
  type: string;
}

@ObjectType({
  implements: () => [ErrorType],
})
export class BadRequestErrorType implements ErrorType {
  code: 400;
  message: string;
  type: string;
}

@ObjectType({
  implements: () => [ErrorType],
})
export class AuthorizationErrorType implements ErrorType {
  code: 401;
  message: string;
  type: string;
}

@ObjectType({
  implements: () => [ErrorType],
})
export class ForbiddenErrorType implements ErrorType {
  code: 403;
  message: string;
  type: string;
}

@ObjectType({
  implements: () => [ErrorType],
})
export class NotFoundErrorType implements ErrorType {
  code: 404;
  message: string;
  type: string;
}

@ObjectType({
  implements: () => [ErrorType],
})
export class InternalServerErrorType implements ErrorType {
  code: 500;
  message: string;
  type: string;
}

export const createErrorUnionType = (classType: new () => unknown) => {
  return createUnionType({
    name: `${classType.name}Result`,
    types: () =>
      [
        classType,
        BadRequestErrorType,
        AuthorizationErrorType,
        ForbiddenErrorType,
        NotFoundErrorType,
        InternalServerErrorType,
      ] as const,
    resolveType: (value) => {
      switch (value.code) {
        case 400:
          return BadRequestErrorType;
        case 401:
          return AuthorizationErrorType;
        case 403:
          return ForbiddenErrorType;
        case 404:
          return NotFoundErrorType;
        case 500:
          return InternalServerErrorType;
        default:
          return classType;
      }
    },
  });
};
