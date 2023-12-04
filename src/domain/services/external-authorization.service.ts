export abstract class ExternalAuthorizationService {
  abstract isAuthorized(): Promise<boolean>
}
