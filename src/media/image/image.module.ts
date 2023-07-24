import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { SharpService } from './sharp.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageRepository } from './image.repository';

@Module({
  imports: [PrismaModule],
  providers: [ImageService, SharpService, ImageRepository],
  exports: [ImageService],
})
export class ImageModule {}
