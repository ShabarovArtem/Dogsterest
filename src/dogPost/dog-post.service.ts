import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import axios from 'axios';
import { DogPost } from './dog-post.model';
import { DogPostRepository } from './dog-post.repository';

@Injectable()
export class DogPostService implements OnModuleInit {
  constructor(private readonly repository: DogPostRepository) {}

  async onModuleInit() {
    await this.importDogPosts();
  }

  async importDogPosts(): Promise<void> {
    const response = await axios.get<string[]>('https://random.dog/doggos');

    if (!response || !response.data) {
      throw new HttpException(
        'Failed to fetch dog posts',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const fileNames = response.data;

    for (const dogName of fileNames) {
      if (this.repository.existsDogName(dogName)) continue;

      const post = new DogPost(dogName);
      this.repository.saveDogPost(post);
    }
  }

  private findPostOrThrow(id: string): DogPost {
    const post = this.repository.getById(id);
    if (!post) {
      throw new NotFoundException('Post is not found');
    }
    return post;
  }

  getPostsPaginated(skip: number, limit: number): DogPost[] {
    const allPosts = this.repository.getAll();

    if (skip < 0) skip = 0;
    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    if (skip >= allPosts.length) {
      return [];
    }

    return allPosts.slice(skip, skip + limit);
  }

  getPostById(id: string): DogPost {
    return this.findPostOrThrow(id);
  }

  likePost(id: string): number {
    const post = this.findPostOrThrow(id);
    post.incrementLikes();
    return post.getLikes();
  }

  unlikePost(id: string): number {
    const post = this.findPostOrThrow(id);
    post.decrementLikes();
    return post.getLikes();
  }
}
