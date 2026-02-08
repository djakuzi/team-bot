import {HttpException, HttpStatus} from '@nestjs/common';

export class ExceptionConflictResource extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
