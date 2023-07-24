import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface CreateUserInput {
  name: string;
  email: string;
  emailVerified?: boolean;
  givenName?: string;
  familyName?: string;
  auth0Id: string;
}

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  public getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  public getUserByAuth0Id(auth0Id: string) {
    return this.prismaService.user.findUnique({
      where: {
        auth0Id,
      },
    });
  }

  public createUser(args: CreateUserInput) {
    const data = this.validateCreate(args);
    return this.prismaService.user.create({
      data,
    });
  }

  private validateCreate({
    name,
    email,
    auth0Id,
    givenName,
    familyName,
    emailVerified,
  }: CreateUserInput) {
    return Prisma.validator<Prisma.UserCreateManyInput>()({
      name,
      auth0Id,
      email,
      givenName,
      familyName,
      emailVerified,
    });
  }
}
