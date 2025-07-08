import { Module } from '@nestjs/common';
import { DogPostController } from './dogPost/dog-post.controller';
import { DogPostService } from './dogPost/dog-post.service';
import { DogPostRepository } from './dogPost/dog-post.repository';

@Module({
  imports: [],
  controllers: [DogPostController],
  providers: [DogPostService, DogPostRepository],
})
export class AppModule {}
