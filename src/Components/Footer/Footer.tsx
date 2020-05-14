import React from 'react';
import './Footer.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Footer extends React.Component {
    render() {
        return (
            <Jumbotron className="about-footer">
                <div className="content">
                    <h6>© Copyright 2020 JORGE CAMILO WU ZHANG</h6>
                    <p>Source Code: <span><a href="https://github.com/jorgecamilowu/realestate-manager">Front-End</a></span> <span><a href="https://github.com/jorgecamilowu/realestate-manager-server">Back-End</a></span></p>
                </div>
            </Jumbotron>
        )
    }
}

export default Footer;