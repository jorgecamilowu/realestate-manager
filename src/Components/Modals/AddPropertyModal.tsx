import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface props {
    show: any,
    onHide: any,
    onAdd(property: { [key: string]: string }): void,
}

interface states {
    name: string,
    address: string,
    type: string,
    numBedrooms: number,
    numBathrooms: number,
    numParkingSpots: number,
    price: number,
    size: number,
}

class AddPropertyModal extends React.Component<props, states> {
    constructor(props: props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            type: "apartment",
            numBedrooms: 0,
            numBathrooms: 0,
            numParkingSpots: 0,
            price: 0,
            size: 0,
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
        this.setState(updateState(event.target.id, event.target.value));
    }

    handleSubmit(event: any): void {
        let properties: { [key: string]: string } = {
            name: this.state.name,
            address: this.state.address,
            type: this.state.type,
            numBedrooms: this.state.numBedrooms.toString(),
            numBathrooms: this.state.numBathrooms.toString(),
            numParkingSpots: this.state.numParkingSpots.toString(),
            price: this.state.price.toString(),
            size: this.state.size.toString(),
        };
        event.preventDefault();
        this.resetValues();
        this.props.onHide();
        this.props.onAdd(properties);
    }

    resetValues(): void {
        this.setState({
            name: "",
            address: "",
            type: "",
            numBedrooms: 0,
            numBathrooms: 0,
            numParkingSpots: 0,
            price: 0,
            size: 0,
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
                        Add a new property
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm={2} >
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Name of the property" value={this.state.name} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="address">
                            <Form.Label column sm={2}>
                                Address
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Location of the property" value={this.state.address} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>
                                Specifications
                            </Form.Label>
                            <Col sm={2}>
                                <OverlayTrigger overlay={<Tooltip id="bedTooltip">number of bedrooms</Tooltip>}>
                                    <Form.Control id="numBedrooms" type="number" placeholder="Bedrooms" value={this.state.numBedrooms} onChange={this.handleChange} />
                                </OverlayTrigger>
                            </Col>
                            <Col sm={2}>
                                <OverlayTrigger overlay={<Tooltip id="bathTooltip">number of bathrooms</Tooltip>}>
                                    <Form.Control id="numBathrooms" type="number" placeholder="Bathrooms" value={this.state.numBathrooms} onChange={this.handleChange} />
                                </OverlayTrigger>
                            </Col>
                            <Col sm={2}>
                                <OverlayTrigger overlay={<Tooltip id="parkingTooltip">number of parking spots</Tooltip>}>
                                    <Form.Control id="numParkingSpots" type="number" placeholder="Parking Spots" value={this.state.numParkingSpots} onChange={this.handleChange} />
                                </OverlayTrigger>
                            </Col>
                            <Col sm={2}>
                                <OverlayTrigger overlay={<Tooltip id="sizeTooltip">size (square feet)</Tooltip>}>
                                    <Form.Control id="size" type="number" placeholder="Size (sqrft)" value={this.state.size} onChange={this.handleChange} />
                                </OverlayTrigger>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="price">
                            <Form.Label column sm={2}>
                                Price
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Price of the property" value={this.state.price} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Type
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Apartment"
                                        name="propertyType"
                                        id="type"
                                        value="apartment"
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="House"
                                        name="propertyType"
                                        id="type"
                                        value="house"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit" block>Add</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddPropertyModal;