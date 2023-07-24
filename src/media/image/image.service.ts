import { Injectable } from '@nestjs/common';
import { SharpService } from './sharp.service';
import { ImageRepository } from './image.repository';
import { z } from 'zod';
import { BadRequestError, NotFoundError } from 'src/errors';

// https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80

const saveImageSchema = z.object({
  url: z.string().url(),
  height: z.number(),
  width: z.number(),
  size: z.number(),
  format: z.string(),
});

@Injectable()
export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly sharpService: SharpService,
  ) {}

  public async getImageFromUrl(url: string) {
    const arrayBuffer = await this.convertUrlToArrayBuffer(url);
    return this.sharpService.getImage(arrayBuffer);
  }

  public async getImageById(id: string) {
    const uuid = z.string().uuid().safeParse(id);
    if (!uuid.success) {
      throw new BadRequestError('Invalid user id');
    }
    const image = await this.imageRepository.getImageById(uuid.data);
    if (!image) {
      throw new NotFoundError('Image not found');
    }
    image.url = image.url.replace('raw', 'webp;w=1200;h=1200');
    return image;
  }

  public async saveImageFromUrl(url: string) {
    const arrayBuffer = await this.convertUrlToArrayBuffer(url);
    const metadata = await this.sharpService.getImageMetadata(arrayBuffer);
    const validatedMetadata = saveImageSchema.parse({
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size,
      url,
    });
    console.log(validatedMetadata);
    const image = await this.imageRepository.createImage(validatedMetadata);
    return image;
  }

  private convertUrlToArrayBuffer(url: string) {
    return fetch(url).then((response) => response.arrayBuffer());
  }
}
