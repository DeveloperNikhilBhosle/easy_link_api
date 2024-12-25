import { ApiProperty } from "@nestjs/swagger";





export class QRIpDTO {

    @ApiProperty()
    upiId: string;

    @ApiProperty()
    amount: number;

}