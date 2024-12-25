import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import * as QRCode from 'qrcode';

@Injectable()
export class PaymentService {


    // Function to generate QR code in base64 format
    async generateQrCode(upiId: string, amount: number, transactionNote: string) {
        // Generate the UPI URL
        const upiUrl = await this.generateUpiUrl(upiId, amount, transactionNote);

        try {
            const encodedTransactionNote = encodeURIComponent(transactionNote);
            console.log(upiUrl, 'UPI URL');
            // Generate QR code and return it as base64-encoded string
            const qrCodeBase64 = await QRCode.toDataURL(`upi://pay?pa=${upiId}&am=${amount}&tn=${encodedTransactionNote}&cu=INR`);
            return {
                statusCode: 200,
                message: 'QR code generated successfully',
                data: {
                    mime_type: 'image/png',
                    base64: qrCodeBase64
                }, // base64-encoded image string
            } // base64-encoded image string
        } catch (err) {
            throw new Error('Failed to generate QR code: ' + err.message);
        }
    }

    async generateUpiUrl(upiId: string, amount: number, transactionNote: string) {
        const upiUrl = `upi://pay?pa=${upiId}&am=${amount}&tn=${transactionNote}&cu=INR`;
        return upiUrl;
    }
}
