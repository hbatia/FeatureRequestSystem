import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateFeatureRequestDto } from './dto/update-feature-request.dto';

@Injectable()
export class FeatureRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  create(title: string, description: string, userId: string) {
    return this.prisma.featureRequest.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.featureRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        _count: { select: { comments: true, votes: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.featureRequest.findUnique({
      where: { id },
      include: {
        user: true,
        comments: { orderBy: { createdAt: 'desc' }, include: { user: true } },
        votes: { orderBy: { createdAt: 'desc' }, include: { user: true } },
        _count: { select: { comments: true, votes: true } },
      },
    });
  }

  update(id: string, data: UpdateFeatureRequestDto) {
    return this.prisma.featureRequest.update({
      where: { id },
      data,
    });
  }
}
