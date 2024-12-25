import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentDetailsDTO } from './payment.dto';

@Controller('api/payment')
@ApiTags("Payment APIs")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('generate-qr-code')
  @ApiOperation({
    summary: 'Generate QR Code for Payment',
    description: 'It accepts the UPI ID, the payment amount, and an optional transaction note as input, and returns a base64-encoded QR code image. The generated QR code can be scanned by a UPI app to initiate the payment.' +
      '\n\n <b>Request Body (JSON): </b>' +
      ' \n\n <li><b>upiId:</b> string (UPI ID of the payee, e.g., "example@upi")</li> ' +
      '\n\n <li><b>amount:</b> number (Payment amount in decimal format, e.g., 100.50)</li>' +
      '\n\n <li><b>transactionNote:</b> string (Optional note for the transaction, e.g., "Payment for order #1234")</li>' +

      '\n\n <b>Response (Base64 QR Code):</b>' +
      '\n\n <li><b>qrCodeBase64:</b> string (Base64 encoded image of the QR code)</li> ',

  })
  async generateQrCode(@Body() request: PaymentDetailsDTO) {

    return await this.paymentService.generateQrCode(request.upiId, request.amount, request.transactionNote);
  }


}
