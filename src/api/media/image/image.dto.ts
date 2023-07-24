import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Image } from '@prisma/client';
import { createErrorUnionType } from 'src/api/error/error.dto';

@ObjectType()
export class ImageType implements Omit<Image, 'createdAt' | 'updatedAt'> {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  size: number;

  @Field(() => String)
  format: string;
}

export const ImageTypeResult = createErrorUnionType(ImageType);
