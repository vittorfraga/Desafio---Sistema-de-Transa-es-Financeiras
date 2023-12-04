import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export enum UserType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}

export interface UserProps {
  name: string
  email: string
  password: string
  cpf: string
  userType: UserType
  balance: number
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt || null
  }
  get name(): string {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get email(): string {
    return this.props.email
  }

  set email(value: string) {
    this.props.email = value
    this.touch()
  }

  get password(): string {
    return this.props.password
  }

  set password(value: string) {
    this.props.password = value
    this.touch()
  }

  get cpf(): string {
    return this.props.cpf
  }

  get userType(): UserType {
    return this.props.userType
  }

  set userType(value: UserType) {
    this.props.userType = value
    this.touch()
  }

  get balance(): number {
    return this.props.balance
  }

  set balance(value: number) {
    this.props.balance = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'balance'>,
    id?: UniqueEntityID,
  ): User {
    const defaultProps = {
      balance: 0,
      createdAt: new Date(),

      ...props,
    }

    const user = new User(defaultProps, id)
    return user
  }
}
