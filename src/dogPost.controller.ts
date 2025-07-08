import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DogPostService } from './dogPost.service';
import { dogPostDto } from './dogPost.dto';

@Controller('dogPost')
export class DogPostController {
  constructor(private readonly dogPostService: DogPostService) {}

  @Get()
  async getPosts(
      @Query('skip') skip = '0',
      @Query('limit') limit = '10',
  ): Promise<dogPostDto[]> {
    const skipNum = parseInt(skip, 10);
    const limitNum = parseInt(limit, 10);

    const posts = await this.dogPostService.getPostsPaginated(skipNum, limitNum);
    return posts.map(post => post.toDto());
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<dogPostDto | null> {
    const post = await this.dogPostService.getPostById(id);
    return post ? post.toDto() : null;
  }

  @Post(':id/like')
  async like(@Param('id') id: string): Promise<{ success: boolean; likes?: number }> {
    const likes = await this.dogPostService.likePost(id);

    if (likes === null) {
      return { success: false };
    }

    return { success: true, likes };
  }
}
