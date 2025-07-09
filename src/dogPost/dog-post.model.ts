import { randomUUID } from 'crypto';
import { dogPostDto } from './dog-post.dto';

export class DogPost {
  readonly id: string;
  readonly fileName: string;
  readonly url: string;
  private likes: number;

  constructor(name: string) {
    this.id = randomUUID();
    this.fileName = name;
    this.url = `https://random.dog/${name}`;
    this.likes = 0;
  }

  getLikes(): number {
    return this.likes;
  }

  incrementLikes(): void {
    this.likes++;
  }

  decrementLikes(): void {
    if (this.likes > 0) {
      this.likes--;
    }
  }

  toDto(): dogPostDto {
    return {
      id: this.id,
      fileName: this.fileName,
      url: this.url,
      likes: this.getLikes(),
    };
  }
}
