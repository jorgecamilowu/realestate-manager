import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Processor from '../../Processor/Processor';

interface metrics {
    monthlyPayment: number,
    annualPayment: number,
    totalPayment: number,
    totalInterest: number
}

interface props {
    show: any,
    onHide: any,
    price: number,
    retrieveNewQuote(quote: { [key: string]: string }): void,
}

interface states {
    bankName: string;
    downPayment: number;
    maturity: number;
    rate: number;
}

class AddQuoteModal extends React.Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            bankName: "",
            downPayment: 0,
            maturity: 0,
            rate: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetValues = this.resetValues.bind(this);
    }

    handleChange(event: any): void {
        const updateState = <T extends string>(key: keyof states, value: T) =>
            (prevState: states): states => ({
                ...prevState,
                [key]: value
            })

        let target: string = event.target.value < 0 ? '0' : event.target.value.toString();
        this.setState(updateState(event.target.id, target));
    }

    handleSubmit(event: any): void {
        /** calculate and set metrics */
        let metrics: metrics = Processor.calculateMetrics(this.state.rate, this.props.price, this.state.downPayment, this.state.maturity);
        let quote: { [key: string]: string } = {
            bankName: this.state.bankName,
            monthlyPayment: metrics.monthlyPayment.toString(),
            annualPayment: metrics.annualPayment.toString(),
            totalPayment: metrics.totalPayment.toString(),
            totalInterest: metrics.totalInterest.toString(),
            downPayment: this.state.downPayment.toString(),
            maturity: this.state.maturity.toString(),
            rate: this.state.rate.toString()
        };
        this.props.retrieveNewQuote(quote);
        this.resetValues();
        event.preventDefault();
        this.props.onHide();
    }

    resetValues(): void {
        this.setState({
            bankName: "",
            downPayment: 0,
            maturity: 0,
            rate: 0,
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add a new bank quote
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="bankName">
                            <Form.Label column sm={2}>
                                Bank
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Bank Name" value={this.state.bankName} onChange={this.handleChange} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="rate">
                            <Form.Label column sm={2}>
                                Interest Rate
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Annual Interest Rate" value={this.state.rate} onChange={this.handleChange} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="maturity">
                            <Form.Label column sm={2}>
                                Maturity
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Maturity of the mortgage contract" value={this.state.maturity} onChange={this.handleChange} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="downPayment">
                            <Form.Label column sm={2}>
                                Down Payment
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="down payment amount" value={this.state.downPayment} onChange={this.handleChange} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="info" type="submit" block>Save</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddQuoteModal;