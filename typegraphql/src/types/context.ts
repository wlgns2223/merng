import { Request } from "express";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export interface Context {
  req: Request;
}
