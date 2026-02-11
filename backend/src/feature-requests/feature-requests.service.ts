import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
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

  findCompletedLastCalendarMonth() {
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    return this.prisma.featureRequest.findMany({
      where: {
        completedAt: {
          gte: startOfLastMonth,
          lt: startOfCurrentMonth,
        },
      },
      orderBy: { completedAt: 'desc' },
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

  updateStatus(id: string, status: Status) {
    return this.prisma.featureRequest.update({
      where: { id },
      data: {
        status,
        completedAt: status === Status.COMPLETED ? new Date() : null,
      },
    });
  }
}
