import { ExternalAuthorizationService } from '@/domain/services/external-authorization.service'
import { SendNotificationService } from '@/domain/services/send-notification.service'
import { Module } from '@nestjs/common'
import { NestExternalAuthorizationService } from './nest-external-authorization.service'
import { NestSendNotificationService } from './nest-send-notification.service'

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ExternalAuthorizationService,
      useClass: NestExternalAuthorizationService,
    },
    {
      provide: SendNotificationService,
      useClass: NestSendNotificationService,
    },
  ],
  exports: [ExternalAuthorizationService, SendNotificationService],
})
export class ServiceModule {}
