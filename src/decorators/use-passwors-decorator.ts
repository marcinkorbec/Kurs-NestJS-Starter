import { SetMetadata } from "@nestjs/common";

export const UsePasswordProtect = (password: string) => SetMetadata('password', password);