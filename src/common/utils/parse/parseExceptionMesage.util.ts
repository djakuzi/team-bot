import {HttpException} from '@nestjs/common';

export function parseExceptionMessage(exception: unknown) {
  if (exception instanceof HttpException) {
    return exception.message;
  }

  if (exception instanceof Error) {
    return exception.message;
  }

  return 'Неизвестная ошибка';
}
