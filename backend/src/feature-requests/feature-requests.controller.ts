import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFeatureRequestDto } from './dto/create-feature-request.dto';
import { UpdateFeatureRequestDto } from './dto/update-feature-request.dto';
import { FeatureRequestsService } from './feature-requests.service';

@Controller('feature-requests')
export class FeatureRequestsController {
  constructor(private readonly featureRequestsService: FeatureRequestsService) {}

  @Post()
  create(@Body() createFeatureRequestDto: CreateFeatureRequestDto) {
    const { title, description, userId } = createFeatureRequestDto;
    return this.featureRequestsService.create(title, description, userId);
  }

  @Get()
  findAll() {
    return this.featureRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureRequestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeatureRequestDto: UpdateFeatureRequestDto,
  ) {
    return this.featureRequestsService.update(id, updateFeatureRequestDto);
  }
}
