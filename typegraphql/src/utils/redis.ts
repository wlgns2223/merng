import Redis from "ioredis";

class RedisSingletone {
  private constructor() {}
  private static _instance: any | undefined;

  public static getInstance() {
    if (this._instance === undefined) {
      this._instance = new Redis();
    }

    return this._instance;
  }
}

const redisSingletone = RedisSingletone.getInstance();

export default redisSingletone;
