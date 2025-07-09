import { Injectable } from '@nestjs/common';
import { DogPost } from './dog-post.model';

@Injectable()
export class DogPostRepository {
  private dogPosts: Map<string, DogPost> = new Map();

  getAll(): DogPost[] {
    return Array.from(this.dogPosts.values());
  }

  getById(id: string): DogPost | null {
    return this.dogPosts.get(id) || null;
  }

  saveDogPost(post: DogPost): void {
    this.dogPosts.set(post.id, post);
  }

  existsDogName(fileName: string): boolean {
    return Array.from(this.dogPosts.values()).some(
      (post) => post.fileName === fileName,
    );
  }
}
