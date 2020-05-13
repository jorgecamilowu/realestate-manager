import React from 'react';
import './Footer.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Footer extends React.Component {
    render() {
        return (
            <Jumbotron className="about-footer">
                <div className="content">
                    <h6>© Copyright 2020 JORGE CAMILO WU ZHANG</h6>
                    <p>Source Code: <span><a href="">Front-End</a></span> <span><a href="">Back-End</a></span></p>
                </div>
            </Jumbotron>
        )
    }
}

export default Footer;