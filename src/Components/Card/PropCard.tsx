import React from 'react';
import './PropCard.css';
import { ObjectId } from 'mongodb';
import Card from 'react-bootstrap/Card';

interface props {
    key: string,
    _id: ObjectId,
    name: string,
    numBedrooms: number,
    numBathrooms: number,
    numParkingSpots: number,
    price: number,
    size: number,
    address: string,
    onDelete(id: string): void,
    onExpand(id: string): void,
}

interface states {
    id: ObjectId,
    price: number,
}

class PropCard extends React.Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            id: new ObjectId(),
            price: 0,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
    }

    componentDidMount() {
        /** keep id in state as we will need it for update and delete operations */
        this.setState({
            id: this.props._id,
            price: this.props.price,
        })
    }

    /**
     * When delete button is pressed, handleDelete will send 
     * the property's id to App for to process once Confirmation 
     * from user has been asserted
     */
    handleDelete() {
        this.props.onDelete(this.props._id.toString());
    }

    handleExpand() {
        this.props.onExpand(this.props._id.toString());
    }

    render() {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return (
            <Card className="propcard">
                <Card.Header className="header">
                    <Card.Link type="button" onClick={this.handleExpand}>expand</Card.Link>
                    {/* <Card.Link type="button" >edit</Card.Link> */}
                    <Card.Link type="button" onClick={this.handleDelete}>delete</Card.Link>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="text-center" >{this.props.name}</Card.Title>
                    <Card.Text>
                            <li className="text-center address">{this.props.address}</li>
                            <br/>
                            <li>Bedrooms: {this.props.numBedrooms}</li>
                            <li>Bathrooms: {this.props.numBathrooms}</li>
                            <li>Parking Spots: {this.props.numParkingSpots}</li>
                            <li>Size: {this.props.size.toLocaleString()} sqft</li>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                    <h5>{formatter.format(this.props.price)}</h5>
                </Card.Footer>
            </Card>
        )
    }
}

export default PropCard;