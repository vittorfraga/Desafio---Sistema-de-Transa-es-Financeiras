import { UserType } from '@/domain/entities/user'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'

describe('Create Transaction E2E', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    prismaService = moduleFixture.get(PrismaService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /transaction', async () => {
    const user1 = await prismaService.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        cpf: faker.datatype.string(11),
        user_type: UserType.INDIVIDUAL,
        balance: faker.datatype.number(1000),
        createdAt: faker.date.recent(),
      },
    })

    const user2 = await prismaService.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        cpf: faker.datatype.string(11),
        user_type: UserType.INDIVIDUAL,
        balance: faker.datatype.number(1000),
        createdAt: faker.date.recent(),
      },
    })

    const response = await request(app.getHttpServer())
      .post('/transaction')
      .send({
        payerId: user1.id,
        payeeId: user2.id,
        value: 100,
      })

    expect(response.status).toBe(201)
  })
})
