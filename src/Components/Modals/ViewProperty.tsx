import React from 'react';
import './ViewProperty.css';
import MetricsOverview from '../FinancialMetrics/MetricsOverview';
import AddQuoteModal from './AddQuoteModal';
import { quote } from '../../Data/Data';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


interface props {
    show: any,
    onHide: any,
    price: number,
    propertyId: string,
    propertyName: string,
    quotes: { [propertyId: string]: quote[] },
    onAddNewQuote(quote: { [key: string]: string }): void,
    onDeleteQuote(quoteId: string, propertyId: string): void,
}

interface states {
    quotes: quote[],
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

    generateTabs() {
        let targetQuotes: quote[] = this.props.quotes[this.props.propertyId];
        if (targetQuotes && targetQuotes.length > 0) {
            let output = targetQuotes.map(quote =>
                <Tab
                eventKey={quote._id.toString()}
                title={quote.bankName}
                key={quote._id.toString()}
                >
                    <br/>
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
                    <Button className="deleteBtn" onClick={this.handleDeleteQuote} variant="outline-danger">Delete Quote</Button>
                </Tab>
            )
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
        this.props.onDeleteQuote(this.state.activeTab, this.props.propertyId);
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