import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Env } from './env'
import { CustomExceptionFilter } from './http/errors/exception-filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })
  app.useGlobalFilters(new CustomExceptionFilter())
  await app.listen(port)
}
bootstrap()
