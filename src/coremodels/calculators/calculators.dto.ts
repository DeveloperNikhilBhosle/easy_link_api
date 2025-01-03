import { ApiProperty } from "@nestjs/swagger";

export class LoanInputDTO {

    @ApiProperty()
    loanAmount: number;

    @ApiProperty()
    tenureInMonths: number;

    @ApiProperty()
    interestRate: number;
}

export class HRACalculatorDTO {
    @ApiProperty()
    basicSalary: number;

    @ApiProperty()
    actualRentPaid: number;

    @ApiProperty()
    isMetroCity: boolean;
}