import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DogPostService } from './dog-post.service';
import { dogPostDto } from './dog-post.dto';

@Controller('dogPost')
export class DogPostController {
  constructor(private readonly dogPostService: DogPostService) {}

  @Get()
  getPosts(
    @Query('skip') skip = '0',
    @Query('limit') limit = '10',
  ): dogPostDto[] {
    const skipNum = parseInt(skip, 10);
    const limitNum = parseInt(limit, 10);

    const posts = this.dogPostService.getPostsPaginated(skipNum, limitNum);
    return posts.map((post) => post.toDto());
  }

  @Get(':id')
  getById(@Param('id') id: string): dogPostDto {
    const post = this.dogPostService.getPostById(id);
    return post.toDto();
  }

  @Post(':id/like')
  like(@Param('id') id: string): { likes: number } {
    const likes = this.dogPostService.likePost(id);
    return { likes };
  }

  @Post(':id/unlike')
  unlike(@Param('id') id: string): { likes: number } {
    const likes = this.dogPostService.unlikePost(id);
    return { likes };
  }
}
