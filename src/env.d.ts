interface ImportMetaEnv {
    readonly IP_API_KEY: string;
    readonly UPSTASH_REDIS_REST_URL: string;
    readonly UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}