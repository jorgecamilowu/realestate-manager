import React from 'react';
import './PropCard.css';
import { ObjectId } from 'mongodb';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HomeIcon from '@material-ui/icons/Home';
import ApartmentIcon from '@material-ui/icons/Apartment';
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { blue } from '@material-ui/core/colors';

interface props {
    key: string,
    _id: ObjectId,
    name: string,
    type: string,
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
                    <OverlayTrigger overlay={<Tooltip id="propertyType">{this.props.type}</Tooltip>}>
                        {this.props.type === "apartment" ? <ApartmentIcon className="type" fontSize="large" /> : <HomeIcon className="type" fontSize="large" />}
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="expandBtn">view financial metrics</Tooltip>}>
                        <Card.Link className="actionBtn" onClick={this.handleExpand}><VisibilityIcon style={{ color: blue[500] }} /></Card.Link>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="deleteBtn">delete this property</Tooltip>}>
                        <Card.Link className="actionBtn" onClick={this.handleDelete}><DeleteIcon color="secondary" /></Card.Link>
                    </OverlayTrigger>
                </Card.Header>
                <Card.Body className="body">
                    <Card.Title>{this.props.name}</Card.Title>
                    <br />
                    <Card.Text>
                        <span className="address">{this.props.address}</span>
                    </Card.Text>
                    <br />
                    <Card.Text className="specs">
                    <OverlayTrigger overlay={<Tooltip id="bedroomsTooltip">number of bedrooms</Tooltip>}>
                        <span><HotelIcon />: {this.props.numBedrooms}</span>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="bathroomsTooltip">number of bathrooms</Tooltip>}>
                        <span><BathtubIcon />: {this.props.numBathrooms}</span>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="parkingTooltip">number of parking spots</Tooltip>}>
                        <span><DirectionsCarIcon />: {this.props.numParkingSpots}</span>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="typeTooltip">size</Tooltip>}>
                        <span><AspectRatioIcon />: {this.props.size.toLocaleString()} sqft</span>
                    </OverlayTrigger>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="footer">
                    <h5>{formatter.format(this.props.price)}</h5>
                </Card.Footer>
            </Card>
        )
    }
}

export default PropCard;