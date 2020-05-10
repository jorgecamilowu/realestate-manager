import React from 'react';
import MetricsOverview from '../FinancialMetrics/MetricsOverview';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ObjectId } from 'mongodb';
import AddQuoteModal from './AddQuoteModal';

interface Quote { //unify this across the whole program
    _id: ObjectId;
    property: ObjectId;
    bankName: string;
    monthlyPayment: number;
    annualPayment: number;
    totalPayment: number;
    totalInterest: number,
    downPayment: number;
    maturity: number;
    rate: number;
}

interface props {
    show: any,
    onHide: any,
    price: number,
    propertyId: string,
    propertyName: string,
    quotes: { [propertyId: string]: Quote[] },
    onAddNewQuote(quote: { [key: string]: string }): void,
    onDeleteQuote(quoteId: string, propertyId: string): void,
}

interface states {
    quotes: Quote[],
    showAddQuote: boolean,
    activeTab: string, /** records current active tab's quote ID */
}

class ViewProperty extends React.Component<props, states> {

    constructor(props: props) {
        super(props);
        this.state = {
            quotes: [],
            showAddQuote: false,
            activeTab: "",
        }
        this.triggerAddNewQuoteModal = this.triggerAddNewQuoteModal.bind(this);
        this.handleAddNewQuote = this.handleAddNewQuote.bind(this);
        this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.generateTabs = this.generateTabs.bind(this);
    }

    // componentWillReceiveProps(props: any) {
    //     const { quotes } = props;
    //     console.info(`new quote: ${Object.keys(quotes)}`);
    //     console.info(`old quotes: ${Object.keys(this.props.quotes)}`);
    //     if(quotes === this.props.quotes) {
    //         console.info('componentwillreceiveprops triggered');
    //         // console.info(quotes);
    //         // this.setState({ quotes: quotes });
    //     }
    // }

    generateTabs() {
        let targetQuotes: Quote[] = this.props.quotes[this.props.propertyId];
        if (targetQuotes && targetQuotes.length > 0) {
            console.info(targetQuotes);
            let output = targetQuotes.map(quote =>
                <Tab
                eventKey={quote._id.toString()}
                title={quote.bankName}
                key={quote._id.toString()}
                >
                    <MetricsOverview
                        price={this.props.price}
                        downPayment={quote.downPayment}
                        rate={quote.rate}
                        maturity={quote.maturity}
                        monthlyPayment={quote.monthlyPayment}
                        annualPayment={quote.annualPayment}
                        totalPayment={quote.totalPayment}
                        totalInterest={quote.totalInterest}
                        />
                    <Button onClick={this.handleDeleteQuote} variant="outline-danger">Delete Quote</Button>
                </Tab>
            )
            console.info('reached before return statement');
            return output;
        }
    }

    triggerAddNewQuoteModal() {
        this.setState({ showAddQuote: !this.state.showAddQuote });
    }

    handleAddNewQuote(quote: { [key: string]: string }) {
        quote['property'] = this.props.propertyId;
        this.props.onAddNewQuote(quote);
    }

    setActiveTab(key: string) {
        this.setState({ activeTab: key })
    }

    handleDeleteQuote() {
        // console.info(this.state.activeTab);
        this.props.onDeleteQuote(this.state.activeTab, this.props.propertyId);
        // this.props.onDeleteQuote(1, this.state.activeTab, this.props.propertyId);

    }

    render() {
        return (
            <>
                <AddQuoteModal
                    show={this.state.showAddQuote}
                    onHide={() => this.setState({ showAddQuote: !this.state.showAddQuote })}
                    price={this.props.price}
                    retrieveNewQuote={this.handleAddNewQuote}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.propertyName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" onSelect={this.setActiveTab} >
                            {this.generateTabs()}
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.triggerAddNewQuoteModal}>New bank quote</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

}

export default ViewProperty;