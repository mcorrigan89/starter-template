import { Module } from '@nestjs/common';
import { ImageApiModule } from './image/image-api.module';

@Module({
  imports: [ImageApiModule],
})
export class MediaApiModule {}
