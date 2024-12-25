import { Injectable } from '@nestjs/common';
import { Helper } from 'src/utils/helper';

@Injectable()
export class CalculatorsService {

    //#region Calculate Home Loan 
    async calculateLoanDetails(loanAmount: number, tenureInMonths: number, interestRate: number) {
        const monthlyInterestRate = (interestRate / 100) / 12;
        const monthlyEMI = this.calculateEMI(loanAmount, monthlyInterestRate, tenureInMonths);
        const totalPayableAmount = monthlyEMI * tenureInMonths;
        const totalInterestPayable = totalPayableAmount - loanAmount;

        // Generate the amortization schedule
        const amortizationSchedule = this.generateAmortizationSchedule(loanAmount, monthlyInterestRate, monthlyEMI, tenureInMonths);

        return {
            statusCode: 200,
            message: "Success",
            data: {
                totalPayableAmount: Helper.roundToDecimal(totalPayableAmount, 2),
                totalInterestPayable: Helper.roundToDecimal(totalInterestPayable, 2),
                monthlyEMI: Helper.roundToDecimal(monthlyEMI, 2),
                amortizationSchedule
            }
        };
    }

    private generateAmortizationSchedule(loanAmount: number, monthlyInterestRate: number, monthlyEMI: number, tenureInMonths: number) {
        let balance = loanAmount;
        let schedule = [];
        for (let month = 1; month <= tenureInMonths; month++) {
            const interest = balance * monthlyInterestRate;
            const principal = monthlyEMI - interest;
            balance -= principal;
            schedule.push({
                month: month,
                principal: parseFloat(principal.toFixed(2)),
                interest: parseFloat(interest.toFixed(2)),
                balance: parseFloat(balance.toFixed(2))
            });
        }
        return schedule;
    }

    private calculateEMI(loanAmount: number, monthlyInterestRate: number, tenureInMonths: number): number {
        if (monthlyInterestRate === 0) {
            return loanAmount / tenureInMonths;
        }
        return loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -tenureInMonths));
    }

    //#endregion
}
