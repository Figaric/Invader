import Redis from "ioredis";

export default function setupRedis() {
    const redisClient = new Redis();

    return redisClient;
}