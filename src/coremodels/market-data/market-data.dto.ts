import { ApiProperty } from "@nestjs/swagger";

export class bhav_copy_ip {

    @ApiProperty()
    date: string;

    @ApiProperty()
    page_no: number;

    @ApiProperty()
    page_size: number;
}