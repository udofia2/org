import { response, Response } from 'express';

response.customSuccess = function (httpStatusCode: number, status: 'success', message: string, data: any = null): Response {
  return this.status(httpStatusCode).json({status, message, data });
};
