import React from 'react';
import './AmortizationTable.css';
import Table from 'react-bootstrap/Table';
import Processor from '../../Processor/Processor';

interface props {
    maturity: number,
    rate: number,
    price: number,
    downPayment: number,
    monthlyPayment: number
}

interface amortTable {
    interest: string,
    principal: string,
    loanBalance: string
}

class AmortizationTable extends React.Component<props, {}> {
    constructor(props: props) {
        super(props);
        this.generateTable = this.generateTable.bind(this);
    }

    generateTable() {
        let data: amortTable[] = Processor.generateAmortization(this.props.maturity, this.props.rate,
            this.props.price, this.props.downPayment, this.props.monthlyPayment);
        let entryNum = 0;
        return data.map(row => {
            entryNum++;
            return (
                <tr key={entryNum + row.interest}>
                    <td>{entryNum}</td>
                    <td>{row.interest}</td>
                    <td>{row.principal}</td>
                    <td>{row.loanBalance}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="table">
                <Table responsive size="sm" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Interest</th>
                            <th>Principal</th>
                            <th>Loan Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AmortizationTable;