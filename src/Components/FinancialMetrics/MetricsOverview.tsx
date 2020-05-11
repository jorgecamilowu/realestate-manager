import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AmortizationTable from '../FinancialMetrics/AmortizationTable';

interface props {
    // id: string,
    price: number,
    downPayment: number,
    rate: number,
    maturity: number,
    monthlyPayment: number,
    annualPayment: number,
    totalPayment: number,
    totalInterest: number,
}

class MetricsOverview extends React.Component<props, {}> {

    render() {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return (
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>Financial Metrics Overview</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Real Estate Price: {formatter.format(this.props.price)}</ListGroup.Item>
                                <ListGroup.Item>Initial Down Payment: {formatter.format(this.props.downPayment)}</ListGroup.Item>
                                <ListGroup.Item>Loan Amount: {formatter.format(this.props.price - this.props.downPayment)}</ListGroup.Item>
                                <ListGroup.Item>Maturity: {this.props.maturity} years</ListGroup.Item>
                                <ListGroup.Item>Annual Interest Rate: {this.props.rate}%</ListGroup.Item>
                                <ListGroup.Item>Monthly Payment: {formatter.format(this.props.monthlyPayment)}</ListGroup.Item>
                                <ListGroup.Item>Annual Payment: {formatter.format(this.props.annualPayment)}</ListGroup.Item>
                                <ListGroup.Item>Total Interest: {formatter.format(this.props.totalInterest)}</ListGroup.Item>
                                <ListGroup.Item>Total Payment: {formatter.format(this.props.totalPayment)}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col>
                        <AmortizationTable
                            downPayment={this.props.downPayment}
                            maturity={this.props.maturity}
                            monthlyPayment={this.props.monthlyPayment}
                            price={this.props.price}
                            rate={this.props.rate}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MetricsOverview;