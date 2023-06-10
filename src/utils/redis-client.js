import { Redis } from 'ioredis';
import config from '../config';

export default function initializeRedisClient() {
  try {
    const redisClient = config.server.isInDevMode
      ? new Redis({
          port: 6379,
          host: '127.0.0.1',
        })
      : new Redis({
          port: config.redis.port,
          host: config.redis.host,
          username: config.redis.user,
          password: config.redis.password,
        });

    redisClient.on('connect', () => {
      console.log('Client connected to redis...');
    });

    redisClient.on('ready', () => {
      console.log('Redis is now open for requests...');
    });

    redisClient.on('error', (error) => {
      console.log(error.message);
      return;
    });

    redisClient.on('end', () => {
      console.log('Client disconnected from redis');
      return;
    });

    const siginalInterruptionOrTermination = config.server.isInDevMode ? 'SIGINT' : 'SIGTERM';
    process.on(siginalInterruptionOrTermination, () => {
      console.log('Client disconnected from redis');
      redisClient.quit();
      process.exit();
    });

    return redisClient;
  } catch (error) {
    throw error;
  }
}
