import { Module } from '@nestjs/common';
import { DogPostController } from './dogPost/dogPost.controller';
import { DogPostService } from './dogPost/dogPost.service';
import { DogPostRepository } from './dogPost/dogPost.repository';

@Module({
  imports: [],
  controllers: [DogPostController],
  providers: [DogPostService, DogPostRepository],
})
export class AppModule {}
