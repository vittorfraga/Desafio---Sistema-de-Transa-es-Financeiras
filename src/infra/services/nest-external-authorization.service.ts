import { ExternalAuthorizationService } from '@/domain/services/external-authorization.service'
import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class NestExternalAuthorizationService
  implements ExternalAuthorizationService
{
  async isAuthorized(): Promise<boolean> {
    try {
      const response = await axios.get(
        'https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc',
      )
      console.log(response.data)

      return response.data?.message === 'Autorizado'
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
