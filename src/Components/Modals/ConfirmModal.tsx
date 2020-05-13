import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface props {
    show: any,
    onHide: any,
    // content: string,
    confirm(target: number, id: string): void,
    id: string,
}

class ConfirmModal extends React.Component<props, {}> {
    constructor(props: props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    /**
     * handleConfirm method will pass the number 0, indicating App that 
     * the user has confirmed deletion decision, along with the captured id
     * that identifies the property/quote to be deleted
     * 
     * dynamically change between property and quote to be implemented.
     */
    handleConfirm() {
        this.props.confirm(0, this.props.id);
        this.props.onHide();
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                centered
            // aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Title className="text-center">Are you sure?</Modal.Title>
                <Modal.Body>
                    <p>Deleting this propery will also delete all related bank quotes. This process cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleConfirm}>Yes</Button>{' '}
                    <Button variant="outline-primary" onClick={this.props.onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ConfirmModal;