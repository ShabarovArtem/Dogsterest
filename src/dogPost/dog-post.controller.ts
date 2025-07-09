import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DogPostService } from './dog-post.service';
import { dogPostDto } from './dog-post.dto';

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

    const posts = await this.dogPostService.getPostsPaginated(
      skipNum,
      limitNum,
    );
    return posts.map((post) => post.toDto());
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<dogPostDto> {
    const post = await this.dogPostService.getPostById(id);
    return post.toDto();
  }

  @Post(':id/like')
  async like(@Param('id') id: string): Promise<{ likes: number }> {
    const likes = await this.dogPostService.likePost(id);
    return { likes };
  }

  @Post(':id/unlike')
  async unlike(@Param('id') id: string): Promise<{ likes: number }> {
    const likes = await this.dogPostService.unlikePost(id);
    return { likes };
  }
}
