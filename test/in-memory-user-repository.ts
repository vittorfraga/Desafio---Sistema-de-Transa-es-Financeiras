import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/domain/repositories/user-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)
    if (!user) {
      return null
    }
    return user
  }

  async create(user: User) {
    this.items.push(user)
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
    this.items[itemIndex] = user
  }
}
