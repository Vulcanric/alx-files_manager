/* Redis DB Model */
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', console.log);
  }

  /**
   * Checks if connection to the database was successful
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Returns the value stored for the given @key
   */
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  /**
   * set - Store a expiring value by a key
   * @key: String key
   * @value: Value to store
   * @duration: Time in seconds before @value expires
   * returns: void
   */
  async set(key, value, duration) {
    await this.client.setex(key, duration, value);
  }

  /**
   * del - Removes a value from Redis by its key
   * @key: String key
   * returns: void
   */
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = RedisClient();
module.exports = redisClient;
