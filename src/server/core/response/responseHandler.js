/* @flow */
import type { $Response } from 'express';

function responseHandler(res: $Response, status: number, data: any) {
  return res.status(status || 200).json(data);
}

module.exports = responseHandler;
