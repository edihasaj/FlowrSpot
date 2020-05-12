import React, { Component } from 'react';
import { Navbar, Nav, Row } from 'react-bootstrap';
import { Link, } from 'react-router-dom'
import logo from './images/old.png';

class NavbarPage extends Component {
    render() {
        let loginState = this.props.loginState;
        let userData = this.props.userData;
        return (
            <Navbar bg="light" expand="lg" absolute="top">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="FlowrSpot" /></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/flowers" className="Nav-item nav-link">Flowers</Link>
                        <Link to="/sightings" className="Nav-item nav-link">Latest Sightings</Link>
                        <Link to="/favorites" className="Nav-item nav-link">Favorites</Link>
                        {loginState ?
                            <Row onClick={() => this.props.showProfile(true)}>
                                <Nav.Link className="Nav-item nav-link">{userData.first_name} {userData.last_name}</Nav.Link>
                                <div className="navbar-profile-picture"></div>
                            </Row>
                            :
                            <Row>
                                <Link to="/" onClick={() => this.props.loginModal(true)} className="Nav-item nav-link" style={{ color: '#EAA79E' }}>Login</Link>
                                <Link to="/"><button onClick={() => this.props.signupModal(true)} className="button New-account-button Pink-background-gradient-color">
                                        New Account
                                    </button></Link>
                            </Row>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavbarPage;