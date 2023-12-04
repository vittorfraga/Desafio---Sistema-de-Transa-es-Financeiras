import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserType } from '@/domain/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        cpf: raw.cpf,
        balance: raw.balance,
        userType: PrismaUserMapper.mapStringToUserType(raw.user_type),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      cpf: user.cpf,
      balance: user.balance,
      user_type: PrismaUserMapper.mapStringToUserType(user.userType),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static mapStringToUserType(userTypeString: string): UserType {
    switch (userTypeString) {
      case 'INDIVIDUAL':
        return UserType.INDIVIDUAL
      case 'BUSINESS':
        return UserType.BUSINESS
      default:
        throw new Error(`Invalid user type: ${userTypeString}`)
    }
  }
}
