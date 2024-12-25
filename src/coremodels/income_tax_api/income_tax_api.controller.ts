import { Body, Controller, Post } from '@nestjs/common';
import { IncomeTaxApiService } from './income_tax_api.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AadharStatusSTO, CalculateTaxPayable } from './models.dto';

@Controller('api')
@ApiTags("Income Tax Service API")
export class IncomeTaxApiController {
  constructor(private readonly incomeTaxApiService: IncomeTaxApiService) { }



  @Post('validate-aadhar-link-status')
  @ApiOperation({
    summary: 'Aadhar-PAN Link Status Verification API',
    description: 'This API validates the link status between an Aadhar number and a PAN number. \n \n It accepts an Aadhar number and a PAN number as input and returns the status of their linkage. The response indicates whether the two numbers are successfully linked, or if there is an issue such as invalid input or no linkage found.' +
      '\n\n <b>Request Body (JSON): </b>' +
      ' \n\n <li><b>aadhaarNumber: </b>string (12-digit Aadhar number without space, e.g., "123456789101") </li>' +
      '\n\n <li><b>pan: </b>string (10-character PAN number, e.g., "ABCDE1234F")</li>',
  })
  async generateUPIQRCode(@Body() ip: AadharStatusSTO) {
    return await this.incomeTaxApiService.ValidateAasharStatus(ip); // Generates the QR code as a Data URL (base64 encoded image)
  }

  @Post('calculate-tax-payable')
  async CalculateTaxPayable(@Body() ip: CalculateTaxPayable) {
    return await this.incomeTaxApiService.calculateTax(ip.totalIncome, ip.totalInvestment, ip.totalLoanInterest, ip.totalTaxPaid, ip.totalRentPaid, ip.isOldRegime)
  }

}
