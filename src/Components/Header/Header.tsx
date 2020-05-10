import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

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
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
      </Nav>
        <Button onClick={this.handleClick} variant="outline-info">+</Button>
    </Navbar>
    )
  }
}

export default Header;