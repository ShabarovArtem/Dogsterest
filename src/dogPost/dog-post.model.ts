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

  getFileName(): string {
    return this.fileName;
  }

  getUrl(): string {
    return this.url;
  }

  incrementLikes(): void {
    this.likes++;
  }

  toDto(): dogPostDto {
    return {
      id: this.id,
      fileName: this.getFileName(),
      url: this.getUrl(),
      likes: this.likes,
    };
  }
}
