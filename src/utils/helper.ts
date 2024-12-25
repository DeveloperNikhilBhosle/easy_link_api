export class Helper {
    static isEmptyOrNull(value) {
        return value === null || value === '';
    }

    static isNull(value) {
        return value === null || value === undefined;
    }

    static roundToDecimal(value: number, decimals: number): number {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }
}