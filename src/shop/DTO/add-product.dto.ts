import { IsNumber, IsString } from "class-validator";

export class AddProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    priceNet: number;

    @IsString()
    photoFn: string;
}