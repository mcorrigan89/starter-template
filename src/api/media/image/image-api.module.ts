import { Module } from '@nestjs/common';
import { ImageModule } from 'src/media/image/image.module';
import { ImageResolver } from './image.resolver';

@Module({
  imports: [ImageModule],
  providers: [ImageResolver],
})
export class ImageApiModule {}
