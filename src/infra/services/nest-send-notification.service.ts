import { SendNotificationService } from '@/domain/services/send-notification.service'
import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class NestSendNotificationService implements SendNotificationService {
  async sendEmailNotification(payeeEmail: string): Promise<void> {
    try {
      const url = 'https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6'

      await axios.post(url, {
        email: payeeEmail,
        message: 'Você recebeu um pagamento',
      })
    } catch (error) {
      console.error('Erro ao enviar notificação', error)
    }
  }
}
