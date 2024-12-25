import { ApiProperty } from "@nestjs/swagger";

export class AadharStatusSTO {
    @ApiProperty()
    aadhaarNumber: string;

    @ApiProperty()
    pan: string;
}

export class CalculateTaxPayable {
    @ApiProperty()
    totalIncome: number;

    @ApiProperty()
    totalInvestment: number;

    @ApiProperty()
    totalLoanInterest: number;

    @ApiProperty()
    totalTaxPaid: number;

    @ApiProperty()
    totalRentPaid: number;

    @ApiProperty()
    isOldRegime: boolean;

}
