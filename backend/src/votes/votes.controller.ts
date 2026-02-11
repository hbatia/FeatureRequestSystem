import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    const { userId, featureRequestId } = createVoteDto;
    return this.votesService.create(userId, featureRequestId);
  }

  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('featureRequestId') featureRequestId?: string,
  ) {
    return this.votesService.findAll({ userId, featureRequestId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
