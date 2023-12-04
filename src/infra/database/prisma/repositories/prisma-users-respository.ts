import { Injectable } from '@nestjs/common'

import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/domain/repositories/user-repository'
import { PrismaUserMapper } from '../../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prismaService.user.create({
      data,
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prismaService.user.update({
      where: {
        id: user.id.toString(),
      },
      data,
    })
  }
}
