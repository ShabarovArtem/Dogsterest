import { Module } from '@nestjs/common';
import { DogPostController } from './dogPost.controller';
import { DogPostService } from './dogPost.service';
import {DogPostRepository} from "./dogPost.repository";

@Module({
  imports: [],
  controllers: [DogPostController],
  providers: [DogPostService,DogPostRepository],
})
export class AppModule {}
