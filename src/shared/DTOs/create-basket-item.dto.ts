import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateBasketItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Min(1)
    @IsInt()
    count: number;
}