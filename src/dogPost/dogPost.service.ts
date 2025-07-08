import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { dogPost } from './dogPost.model';
import { DogPostRepository } from './dogPost.repository';

@Injectable()
export class DogPostService implements OnModuleInit {
  constructor(private readonly repository: DogPostRepository) {}

  async onModuleInit() {
    await this.importDogPosts();
  }

  async importDogPosts(): Promise<void> {
    try {
      const response = await axios.get<string[]>('https://random.dog/doggos');
      const fileNames = response.data;

      for (const dogName of fileNames) {
        if (this.repository.existsDogName(dogName)) continue;

        const post = new dogPost(dogName);
        this.repository.saveDogPost(post);
      }
    } catch (error) {
      throw error;
    }
  }

  async getPostsPaginated(skip: number, limit: number): Promise<dogPost[]> {
    const allPosts = await this.repository.getAll();

    if (skip < 0) skip = 0;
    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    return allPosts.slice(skip, skip + limit);
  }

  async getPostById(id: string): Promise<dogPost | null> {
    return this.repository.getById(id);
  }

  async likePost(id: string): Promise<number | null> {
    const success = this.repository.likeDogPost(id);
    if (!success) return null;

    const updated = this.repository.getById(id);
    return updated?.likes ?? null;
  }

}
