import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    const { content, userId, featureRequestId } = createCommentDto;
    return this.commentsService.create(content, userId, featureRequestId);
  }

  @Get()
  findAll(
    @Query('featureRequestId') featureRequestId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.commentsService.findAll({ featureRequestId, userId });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
