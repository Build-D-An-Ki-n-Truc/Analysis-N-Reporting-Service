import { HttpStatus } from '@nestjs/common';

export class ResponsePayload<T> {
  payload: {
    type: string[];
    status: HttpStatus;
    data: T;
  };
}
