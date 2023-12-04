import { faker } from '@faker-js/faker'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { User, UserProps, UserType } from 'src/domain/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
): User {
  const defaultProps: UserProps = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    cpf: faker.string.numeric(11),
    userType: UserType.INDIVIDUAL,
    balance: 0,
    createdAt: new Date(),
    ...override,
  }

  return User.create(defaultProps, id)
}
