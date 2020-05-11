import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface props {
  showAddModal(): any,
}

class Header extends React.Component<props> {

  constructor(props: props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.props.showAddModal();
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Real Estate Manager</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <OverlayTrigger overlay={<Tooltip id="addBtnTooltip">new property</Tooltip>} placement="bottom">
          <Button onClick={this.handleClick} variant="outline-light" size="lg"><span>+</span></Button>
        </OverlayTrigger>
      </Navbar>
    )
  }
}

export default Header;