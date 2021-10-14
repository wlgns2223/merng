import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn = async (action, next) => {
  console.log(action);

  return next();
};
