import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface CreateImageInput {
  url: string;
  height: number;
  width: number;
  size: number;
  format: string;
}

@Injectable()
export class ImageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public getImageById(id: string) {
    return this.prismaService.image.findUnique({
      where: {
        id,
      },
    });
  }

  public createImage(args: CreateImageInput) {
    const data = this.validateCreate(args);
    return this.prismaService.image.create({
      data,
    });
  }

  private validateCreate({
    url,
    height,
    width,
    size,
    format,
  }: CreateImageInput) {
    return Prisma.validator<Prisma.ImageCreateInput>()({
      url,
      height,
      width,
      size,
      format,
    });
  }
}
