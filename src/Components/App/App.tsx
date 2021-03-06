import React from 'react';
import './App.css';
import Header from '../Header/Header'
import PropCard from '../Card/PropCard';
import DataHandler from '../../DataManagement/DatabaseHandler'
import { property, quote } from '../../Data/Data';
import AddPropertyModal from '../Modals/AddPropertyModal';
import ConfirmModal from '../Modals/ConfirmModal';
import ViewProperty from '../Modals/ViewProperty';
import Row from 'react-bootstrap/Row';
import Footer from '../Footer/Footer';
import DisplayUnresponsiveServer from '../DisplayUnresponsiveServer/DisplayUnresponsiveServer';


interface states {
    properties: property[] /** represents the list of properties retrieved from database */
    showAddModal: boolean, /** boolean state that triggers the window to add a property */
    showConfirmModal: boolean, /** boolean state that triggers the confirm message modal*/
    showExpand: boolean,
    targetProperty: string, /** current active property's id */
    targetPropertyPrice: number,/** current active property's price  */
    targetPropertyName: string,
    propertyQuotes: { [propertyId: string]: quote[] }, /** dictionary of properties tied to their quotes */
}

class App extends React.Component<{}, states> {
    constructor(props: any) {
        super(props);
        this.state = {
            properties: [],
            showAddModal: false,
            showConfirmModal: false,
            showExpand: false,
            targetProperty: "",
            targetPropertyName: "",
            targetPropertyPrice: 0,
            propertyQuotes: {},
        }
        this.generatePropertyCards = this.generatePropertyCards.bind(this);
        this.triggerAddModal = this.triggerAddModal.bind(this);
        this.triggerConfirmModal = this.triggerConfirmModal.bind(this);
        this.triggerExpand = this.triggerExpand.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
        this.handleDeleteProperty = this.handleDeleteProperty.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleAddNewQuote = this.handleAddNewQuote.bind(this);
        this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
        this.displayUnresponsiveServer = this.displayUnresponsiveServer.bind(this);
    }

    componentDidMount() {
        /** read in property list from database */
        DataHandler.getProperties().then(response => {
            this.setState({
                properties: response,
            })
        });

        /** read in quotes list from database and create a dictionary of {property, quote[]} */
        let currentPropertyQuotes = this.state.propertyQuotes;
        DataHandler.getQuotes().then(quotes => {
            for (let key in quotes) {
                let propertyId: string = quotes[key].property.toString();
                //append quote
                if (propertyId in currentPropertyQuotes) {
                    currentPropertyQuotes[propertyId].push(quotes[key]);
                }
                //add new property:quote pair value
                else {
                    currentPropertyQuotes[propertyId] = [quotes[key]];
                }
            }
        });

        this.setState({ propertyQuotes: currentPropertyQuotes });
    }

    //Returns a friendly msg to inform the user database could not be reached
    displayUnresponsiveServer() {
        return (
            <DisplayUnresponsiveServer 
                title={'Error: Unresponsive Server'}
                content={'Oops! Looks like we could not reach the database server... :('}
            />
        )
    }

    /** trigger modal to open/close */
    triggerAddModal() {
        this.setState({
            showAddModal: !this.state.showAddModal,
        })
    }

    /**
     * this method will open the confirm modal message and
     * record the targeted property/quote's unique id into the
     * confirmedTarget state.
     * @param propertyId property unique id
     */
    triggerConfirmModal(propertyId: string, quoteId?: string) {
        this.setState({
            showConfirmModal: !this.state.showConfirmModal,
            targetProperty: propertyId
        })
    }

    /**
     * this method will help bridge the property id information needed for each 
     * @param propertyId 
     */
    triggerExpand(propertyId: string) {
        let targetProperty: property | undefined = this.state.properties.find(property => property._id.toString() === propertyId)
        if (targetProperty) {
            let name: string = targetProperty.name;
            let price: number = targetProperty.price;
            this.setState({
                targetProperty: propertyId,
                targetPropertyPrice: price,
                targetPropertyName: name,
                showExpand: !this.state.showExpand,
            })
        } else {
            console.error('Property not found');
        }
    }

    /**
     * React is not able to update properly. I think this has to do with
     * the time mismatch between fetching data from database and rendering.
     * 
     * error is happening at generatePropCards method ---> cannot call toString of unidentified '_id'
     * @param property 
     */
    handleAddProperty(property: { [key: string]: string }) {
        DataHandler.addProperty(property).then(response => {
            let newProperties: property[] = this.state.properties;
            newProperties.push(response);
            this.setState({ properties: newProperties });
        });
    }

    /**
     * this method gets called when the "confirm" button was
     * pressed inside the confirm modal. The modal will pass
     * the id stored when triggerConfirmModal was called
     * 
     * @param target 0 deletes a property, 1 deletes a quote
     * @param propertyId property or quote's unique id
     */
    handleConfirm(target: number, propertyId: string, quoteId?: string) {
        if (target === 0) {
            this.handleDeleteProperty(propertyId);
        }
        else if (target === 1) {
            /** to be implemented */
            console.info('quote deletion triggered');
        }
    }

    /** calls database handler and deletes property */
    handleDeleteProperty(propertyId: string): void {
        DataHandler.deleteProperty(propertyId);
        /**update state.properties to not include deleted property*/
        let newProperties: property[] = this.state.properties;
        newProperties = newProperties.filter(property => property._id.toString() !== propertyId);
        this.setState({ properties: newProperties });

        /** delete all related quotes */
        DataHandler.deleteManyQuotes(propertyId).then(() => {
            let newQuotes: { [key: string]: quote[] } = this.state.propertyQuotes;
            delete newQuotes[propertyId];
            // newQuotes[propertyId] = newQuotes[propertyId].filter(quote => quote.property.toString() !== propertyId);
            this.setState({ propertyQuotes: newQuotes });
        });
    }

    /** takes the list of properties retrieved from database and generates property components */
    generatePropertyCards() {
        return (
            this.state.properties.map(property =>
                <PropCard
                    key={property._id.toString()}
                    _id={property._id}
                    name={property.name}
                    address={property.address}
                    type={property.type}
                    numBedrooms={property.numBedrooms}
                    numBathrooms={property.numBathrooms}
                    numParkingSpots={property.numParkingSpots}
                    price={property.price}
                    size={property.size}
                    onDelete={this.triggerConfirmModal}
                    onExpand={this.triggerExpand}
                />
            )
        )
    }

    /** QUOTES METHODS */
    /**
     * 
     * @param quote 
     */
    handleAddNewQuote(quote: { [key: string]: string }) {
        quote['property'] = this.state.targetProperty;
        /** update database and list of quotes */
        DataHandler.addQuote(quote).then(response => {
            let currentPropertyQuotes: { [key: string]: quote[] } = this.state.propertyQuotes;
            if (currentPropertyQuotes.hasOwnProperty(this.state.targetProperty)) {
                currentPropertyQuotes[this.state.targetProperty].push(response);
            } else {
                currentPropertyQuotes[this.state.targetProperty] = [response];
            }
            this.setState({ propertyQuotes: currentPropertyQuotes });
        })
    }

    handleDeleteQuote(quoteId: string, propertyId: string) {
        DataHandler.deleteQuote(quoteId).then(() => {
            let currentQuotes = this.state.propertyQuotes;
            currentQuotes[propertyId] = currentQuotes[propertyId].filter(quote => quote._id.toString() !== quoteId);
            this.setState({ propertyQuotes: currentQuotes });
        })
    }

    render() {
        return (
            <div>
                <Header showAddModal={this.triggerAddModal} />
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={() => this.setState({ showConfirmModal: !this.state.showConfirmModal })}
                    confirm={this.handleConfirm}
                    id={this.state.targetProperty}
                />
                <AddPropertyModal
                    show={this.state.showAddModal}
                    onHide={() => this.setState({ showAddModal: !this.state.showAddModal })}
                    onAdd={this.handleAddProperty}
                />
                <ViewProperty
                    show={this.state.showExpand}
                    onHide={() => this.setState({ showExpand: !this.state.showExpand })}
                    price={this.state.targetPropertyPrice}
                    propertyId={this.state.targetProperty}
                    propertyName={this.state.targetPropertyName}
                    quotes={this.state.propertyQuotes}
                    onAddNewQuote={this.handleAddNewQuote}
                    onDeleteQuote={this.handleDeleteQuote}
                />
                <Row className="properties justify-content-center">
                    {this.state.properties === undefined ? this.displayUnresponsiveServer() : this.generatePropertyCards()}
                </Row>
                <div className="about">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
