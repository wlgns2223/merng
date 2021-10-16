import { v4 } from "uuid";
import redisSingletone from "./redis";

const createConfirmURL = async (userId: number): Promise<string> => {
  const token = v4();
  await redisSingletone.set(token, userId, "ex", 60 * 60 * 24);

  return `http://localhost:3000/user/confirm/${token}`;
};

export default createConfirmURL;
