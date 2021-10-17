import { Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export interface MyContext {
  req: Request;
  res: Response;
}
