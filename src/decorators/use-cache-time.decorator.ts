import { SetMetadata } from "@nestjs/common";

export const UseCacheTime = (cacheTimeInSecond: number) => SetMetadata('cacheTimeInSec', cacheTimeInSecond);