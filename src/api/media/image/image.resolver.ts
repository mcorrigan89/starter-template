import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from 'src/media/image/image.service';
import { ImageTypeResult } from './image.dto';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query(() => ImageTypeResult)
  async image(@Args('id', { type: () => String }) id: string) {
    return this.imageService.getImageById(id);
  }

  @Mutation(() => Boolean)
  async uploadImageFromUrl(@Args('url', { type: () => String }) url: string) {
    await this.imageService.saveImageFromUrl(url);
    return true;
  }
}
