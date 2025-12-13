import { Redis } from "@upstash/redis";

const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } = import.meta.env;

const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN
});

export default redis;