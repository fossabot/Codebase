import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private readonly db: PrismaService) {}

  async getGroupFromUser(userId: string) {
    await this.db;
  }

  async getAll(userId: string) {
    const { groups } = await this.db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        groups: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return groups;
  }

  async getById(id: string) {
    return await this.db.group.findUnique({
      where: {
        id,
      },
      include: {
        User: {
          select: {
            id: true,
            email: true,
            password: false,
          },
        },
        movie: true,
      },
    });
  }

  async createGroup(name: string, ownerId: string) {
    return await this.db.group.create({
      data: {
        name,
        ownerId,
      },
    });
  }
}
