import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();


class Cache {
  private redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      keyPrefix: 'cache:'
    })
  }

  async get(key: string) {
    const value = await this.redis.get(key)

    return value ? JSON.parse(value): null;
  }

  set(key: string, value: Object[]) {
    return this.redis.set(key, JSON.stringify(value));
  }
}

export default new Cache();
