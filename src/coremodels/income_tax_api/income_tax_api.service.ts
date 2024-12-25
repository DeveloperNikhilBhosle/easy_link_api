import { BadRequestException, Injectable } from '@nestjs/common';
import { AadharStatusSTO } from './models.dto';
import { Helper } from 'src/utils/helper';

@Injectable()
export class IncomeTaxApiService {


    async ValidateAasharStatus(ip: AadharStatusSTO) {

        if (Helper.isEmptyOrNull(ip.aadhaarNumber) || Helper.isEmptyOrNull(ip.pan)) {
            throw new BadRequestException('Aadhaar Number and PAN are required');
        }

        //#region API Call

        const axios = require('axios');
        let data = JSON.stringify({
            "aadhaarNumber": ip.aadhaarNumber,
            "pan": ip.pan,
            "preLoginFlag": "Y",
            "serviceName": "linkAadhaarPreLoginService"
        });

        console.log(process.env.AADHAR_PAN_LINK_API, 'process.env.AADHAR_PAN_LINK_API');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.AADHAR_PAN_LINK_API,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '6c041baed60b40f7bed31a99a995233c=98cca515c7008a11a786556cdba74b74'
            },
            data: data
        };

        var res = await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                return response.data
            })
            .catch((error) => {
                console.log(error);
                throw new BadRequestException('Encounter Error while validating Aadhaar and PAN');
            });

        return {
            statusCode: 200,
            message: "Success",
            error: "",
            data: {
                status: res.messages[0].desc
            }
        };


        //#endregion

    }

    //#region Calculate Tax Payable Amount


    async calculateTax(totalIncome: number, totalInvestment: number, totalLoanInterest: number, totalTaxPaid: number, rentPaid: number, isOldRegime: boolean,
    ) {
        const basicTaxableIncome = totalIncome - totalInvestment - totalLoanInterest;
        const hraBenefit = this.calculateHRA(rentPaid);

        let totalTaxPayable = 0;
        if (isOldRegime) {
            totalTaxPayable = this.calculateOldRegimeTax(basicTaxableIncome, hraBenefit);
        } else {
            totalTaxPayable = this.calculateNewRegimeTax(basicTaxableIncome);
        }

        const taxPayable = Math.max(0, totalTaxPayable - totalTaxPaid); // Ensure tax payable isn't negative
        const recommendedRegime = this.recommendedTaxRegime(
            totalIncome,
            totalInvestment,
            totalLoanInterest,
            totalTaxPaid,
            rentPaid,
        );

        return {
            oldTaxPayable: this.calculateOldRegimeTax(basicTaxableIncome, hraBenefit),
            newTaxPayable: this.calculateNewRegimeTax(basicTaxableIncome),
            recommendedTaxRegime: recommendedRegime,
            remainingTaxPayable: taxPayable,
            hraBenefit,
        };
    }

    private calculateOldRegimeTax(basicTaxableIncome: number, hraBenefit: number): number {
        // Old Regime Tax Slabs
        let tax = 0;
        if (basicTaxableIncome <= 250000) {
            tax = 0;
        } else if (basicTaxableIncome <= 500000) {
            tax = (basicTaxableIncome - 250000) * 0.05;
        } else if (basicTaxableIncome <= 1000000) {
            tax = 250000 * 0.05 + (basicTaxableIncome - 500000) * 0.2;
        } else {
            tax = 250000 * 0.05 + 500000 * 0.2 + (basicTaxableIncome - 1000000) * 0.3;
        }

        // Apply HRA Benefits if eligible
        return tax - hraBenefit;
    }

    private calculateNewRegimeTax(basicTaxableIncome: number): number {
        // New Regime Tax Slabs (FY 2023-24)
        let tax = 0;
        if (basicTaxableIncome <= 250000) {
            tax = 0;
        } else if (basicTaxableIncome <= 500000) {
            tax = (basicTaxableIncome - 250000) * 0.05;
        } else if (basicTaxableIncome <= 750000) {
            tax = 250000 * 0.05 + (basicTaxableIncome - 500000) * 0.1;
        } else if (basicTaxableIncome <= 1000000) {
            tax = 250000 * 0.05 + 250000 * 0.1 + (basicTaxableIncome - 750000) * 0.15;
        } else if (basicTaxableIncome <= 1250000) {
            tax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + (basicTaxableIncome - 1000000) * 0.2;
        } else if (basicTaxableIncome <= 1500000) {
            tax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + (basicTaxableIncome - 1250000) * 0.25;
        } else {
            tax = 250000 * 0.05 + 250000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + 250000 * 0.25 + (basicTaxableIncome - 1500000) * 0.3;
        }

        return tax;
    }

    private calculateHRA(rentPaid: number): number {
        // Assuming the maximum deduction under Section 10(13A)
        const hraDeductionLimit = rentPaid * 0.10; // Assuming 10% of total rent paid is deductible
        return hraDeductionLimit;
    }

    private recommendedTaxRegime(
        totalIncome: number,
        totalInvestment: number,
        totalLoanInterest: number,
        totalTaxPaid: number,
        rentPaid: number,
    ): string {
        const oldRegimeTax = this.calculateOldRegimeTax(
            totalIncome - totalInvestment - totalLoanInterest,
            this.calculateHRA(rentPaid),
        );
        const newRegimeTax = this.calculateNewRegimeTax(totalIncome - totalInvestment - totalLoanInterest);

        return oldRegimeTax < newRegimeTax ? 'Old Regime' : 'New Regime';
    }


    //#endregion
}
