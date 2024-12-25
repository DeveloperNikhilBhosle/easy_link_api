import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorsService } from './calculators.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoanInputDTO } from './calculators.dto';


@Controller('api')
@ApiTags("Calculators")
export class CalculatorsController {
  constructor(private readonly calculatorsService: CalculatorsService) { }

  @Post('loan/calculator')
  @ApiOperation({
    summary: 'Loan Calculator API',
    description: 'This API calculates the details of a loan based on the loan amount, tenure, and interest rate. \n\n It accepts the loan amount, tenure (in months), and interest rate as input, and returns the total payable amount, total interest payable, monthly EMI, and a detailed amortization schedule showing the principal, interest, and balance for each month.' +
      '\n\n <b>Request Body (JSON): </b>' +
      ' \n\n<li><b>loanAmount:</b> number (The principal loan amount, e.g., 100000)</li> ' +
      '\n\n <li><b>tenureInMonths:</b> number (The tenure of the loan in months, e.g., 24)</li>' +
      '\n\n <li><b>interestRate:</b> number (The annual interest rate as a percentage, e.g., 10.5)</li>' +

      '\n\n <b><b>Response (Loan Details):</b></b>' +
      '\n\n <li><b>totalPayableAmount:</b> number (The total amount to be paid over the loan tenure, e.g., 116378.64)</li>' +
      '\n\n <li><b>totalInterestPayable:</b> number (The total interest payable over the loan tenure, e.g., 37601.64)</li>' +
      '\n\n  <li><b>monthlyEMI:</b> number (The monthly EMI to be paid, e.g., 9698.22)</li>' +
      '\n\n <li><b>amortizationSchedule:</b> array (An array of monthly breakdowns containing the principal, interest, and remaining balance for each month)</li>',

  })
  calculateLoan(@Body() loanInput: LoanInputDTO) {
    const { loanAmount, tenureInMonths, interestRate } = loanInput;
    return this.calculatorsService.calculateLoanDetails(loanAmount, tenureInMonths, interestRate);
  }

}
