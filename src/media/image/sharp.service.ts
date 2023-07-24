import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class SharpService {
  public async getImage(image: ArrayBuffer) {
    let imageSharp = sharp(image);
    const metadata = await this.getMetadata(imageSharp);
    console.log(metadata);
    imageSharp = this.convertToWebp(imageSharp);
    // imageSharp = this.resize(imageSharp);
    return imageSharp;
  }

  public getImageMetadata(image: ArrayBuffer) {
    const imageSharp = sharp(image);
    return this.getMetadata(imageSharp);
  }

  private resize(image: sharp.Sharp) {
    return image.resize(200, 200);
  }

  private convertToWebp(image: sharp.Sharp) {
    return image.webp();
  }

  private getMetadata(image: sharp.Sharp) {
    return image.metadata();
  }
}
