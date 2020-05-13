import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

interface props {
    title: string,
    content: string,
}

class DisplayUnresponsiveServer extends React.Component<props, {}> {
    render() {
        return (
            <Jumbotron>
                <Container className="text-center">
                    <h3>{this.props.title}</h3>
                    <br />
                    <h5>{this.props.content}</h5>
                </Container>
            </Jumbotron>
        )
    }
}

export default DisplayUnresponsiveServer;