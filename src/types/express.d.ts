import {
  Request,
  Response,
  RequestHandler as ExpressRequestHandler,
} from "express";

declare module "express" {
  interface Request {
    params: {
      [key: string]: string;
    };
  }
}

export interface RequestWithParams<T = {}> extends Request {
  params: T;
}

export interface RequestWithBody<T = {}> extends Request {
  body: T;
}

export interface RequestWithParamsAndBody<P = {}, B = {}> extends Request {
  params: P;
  body: B;
}

export interface ResponseWithData<T = any> extends Response {
  json: (body: T) => ResponseWithData<T>;
}

export type RequestHandler = ExpressRequestHandler;
