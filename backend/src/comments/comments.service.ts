import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CommentFilters {
  featureRequestId?: string;
  userId?: string;
}

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(content: string, userId: string, featureRequestId: string) {
    return this.prisma.comment.create({
      data: {
        content,
        userId,
        featureRequestId,
      },
    });
  }

  findAll(filters: CommentFilters) {
    const { featureRequestId, userId } = filters;
    return this.prisma.comment.findMany({
      where: {
        featureRequestId,
        userId,
      },
      orderBy: { createdAt: 'desc' },
      include: { user: true, featureRequest: true },
    });
  }

  remove(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
