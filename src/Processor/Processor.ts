class Processor {
    /**
     * Calculates basic financial metrics of the mortgage
     * @param rate annual interest rate
     * @param price total price of the property
     * @param downPayment down payment amount for the mortgage
     * @param maturity years stated for the mortgage
     */
    public static calculateMetrics(rate: number, price: number, downPayment: number, maturity: number): {monthlyPayment: number, annualPayment: number, totalPayment: number, totalInterest: number} {
        let principal = price - downPayment;
        let monthlyPayment: number = Processor.calculateMonthlyPayments(rate, principal, maturity);
        let annualPayment: number = monthlyPayment * 12;
        let totalPayment: number = monthlyPayment * 12 * maturity;
        let totalInterest: number = totalPayment - principal;
        return {
            monthlyPayment: monthlyPayment,
            annualPayment: annualPayment,
            totalPayment: totalPayment,
            totalInterest: totalInterest
        };
    }

    //helper method to calculate monthly payments based on PMT
    private static calculateMonthlyPayments(rate: number, principal: number, maturity: number): number {
        if(maturity === 0) return 0;
        let monthlyRate = rate / 1200; //monthly decimal form
        maturity *= 12;
        //following PMT formula to calculate monthly payment
        return principal * monthlyRate * Math.pow(1+monthlyRate, maturity)/(Math.pow(1+monthlyRate, maturity) - 1);
    }
 
    /**
     * Generates amortization schedule
     * @param maturity years stated for the mortgage
     * @param rate annual interest rate
     * @param price total price of the property 
     * @param downPayment down payment amount for the mortgage
     * @param monthlyPayment mortgage monthly payment
     */
    public static generateAmortization(maturity: number, rate: number, price: number, downPayment: number, monthlyPayment: number): {interest: string, principal: string, loanBalance: string}[] {
        let loan = price - downPayment;
        let impliedRate: number = rate / 1200; //monthly decimal form
        let table: {interest: string, principal: string, loanBalance: string}[] = [];
        let time = maturity * 12;
        let balance = loan;
        for(let i = 0; i < time; i++) {
            let interest = (impliedRate * balance);
            let principal = monthlyPayment - interest;
            balance -= principal;
            table.push({
                interest: interest.toFixed(2),
                principal: principal.toFixed(2),
                loanBalance: balance.toFixed(2)
            })
        }
        return table;
    }

}


export default Processor;