import { Injectable } from '@nestjs/common';
import { dogPost } from './dogPost.model';

@Injectable()
export class DogPostRepository {
    private dogPosts: Map<string, dogPost> = new Map();

    getAll(): dogPost[] {
        return Array.from(this.dogPosts.values());
    }

    getById(id: string): dogPost | null {
        return this.dogPosts.get(id) || null;
    }

    saveDogPost(post: dogPost): void {
        this.dogPosts.set(post.id, post);
    }

    likeDogPost(id: string): boolean {
        const post = this.dogPosts.get(id);
        if (!post) return false;
        post.incrementLikes();
        return true;
    }

    existsDogName(fileName: string): boolean {
        return Array.from(this.dogPosts.values()).some(
            (post) => post.getFileName() === fileName,
        );
    }
}
