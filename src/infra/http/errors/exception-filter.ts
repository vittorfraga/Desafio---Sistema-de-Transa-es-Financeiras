import {
  BusinessUserTransactionError,
  InsufficientBalanceError,
  PayeeNotFoundError,
  PayerNotFoundError,
  UnauthorizedTransactionError,
} from '@/domain/use-cases/errors/errors'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception.message

    switch (exception.constructor) {
      case PayerNotFoundError:
        status = HttpStatus.NOT_FOUND
        break
      case PayeeNotFoundError:
        status = HttpStatus.NOT_FOUND
        break
      case InsufficientBalanceError:
        status = HttpStatus.BAD_REQUEST
        break
      case UnauthorizedTransactionError:
        status = HttpStatus.UNAUTHORIZED
        break
      case BusinessUserTransactionError:
        status = HttpStatus.BAD_REQUEST
        break

      default:
        if (exception instanceof HttpException) {
          status = exception.getStatus()
        }
        break
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: context.getRequest().url,
    })
  }
}
