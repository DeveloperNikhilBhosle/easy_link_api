import { ApiProperty } from "@nestjs/swagger";
import { strict } from "assert";

export class PaymentDetailsDTO {
    @ApiProperty()
    upiId: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    transactionNote: string;
}