export abstract class SendNotificationService {
  abstract sendEmailNotification(payeeEmail: string): Promise<void>
}
