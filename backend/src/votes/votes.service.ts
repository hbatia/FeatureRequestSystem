import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface VoteFilters {
  userId?: string;
  featureRequestId?: string;
}

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, featureRequestId: string) {
    return this.prisma.vote.create({
      data: {        userId,
        featureRequestId,
      },
    });
  }

  findAll(filters: VoteFilters) {
    const { userId, featureRequestId } = filters;
    return this.prisma.vote.findMany({
      where: {
        userId,
        featureRequestId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.vote.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.vote.delete({ where: { id } });
  }
}
