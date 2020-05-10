import { ObjectId } from "mongodb";

class Quote {
    private id: string;
    private property: string;
    private bankName: string;
    private monthlyPayment: number;
    private annualPayment: number;
    private totalPayment: number;
    private downPayment: number;
    private tenor: number;
    private rate: number;

    constructor(id: string, property: string, downPayment: number, bankName: string, monthlyPayment: number = 0, 
                annualPayment: number = 0, totalPayment: number = 0, tenor: number = 0, rate: number = 0) {
        this.id = id;
        this.property = property;
        this.bankName = bankName;
        this.monthlyPayment = monthlyPayment;
        this.annualPayment = annualPayment;
        this.totalPayment = totalPayment;
        this.downPayment = downPayment;
        this.tenor = tenor;
        this.rate = rate;
    }

    //////////////// GETTERS ////////////////
    public getProperty(): string {
        return this.property;
    }

    public getBankName(): string {
        return this.bankName;
    }

    public getMonthlyPayment(): number {
        return this.monthlyPayment;
    }

    public getAnnualPayment(): number {
        return this.annualPayment;
    }

    public getTotalPayment(): number {
        return this.totalPayment;
    }

    public getDownPayment(): number {
        return this.downPayment;
    }

    public getTenor(): number {
        return this.tenor;
    }

    public getRate(): number {
        return this.rate;
    }

    //////////////// SETTERS ////////////////
    public setBankName(name: string): void {
        this.bankName = name;
    }

    public setMonthlyPayment(monthPayment: number): void {
        this.monthlyPayment = monthPayment;
    }

    public setAnnualPayment(annualPayment: number): void {
        this.annualPayment = annualPayment;
    }

    public setTotalPayment(totalPayment: number): void {
        this.totalPayment = totalPayment;
    }

    public setDownPayment(downPayment: number): void {
        this.downPayment = downPayment;
    }

    public setTenor(tenor: number): void {
        this.tenor = tenor;
    }

    public setRate(rate: number): void {
        this.rate = rate;
    }
}

export default Quote;