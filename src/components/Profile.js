import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';
import Close from '@material-ui/icons/Close';

class Profile extends Component {
    render() {
        return (
            <div>
                <button className="button" onClick={this.props.onHide}>
                    <Close id="material-icon" className="remove-button" /></button>
                <Row className="profile-header-modal">
                    <div className="profile-image-modal"></div>
                    <div className="profile-header-text">
                        <h5 className="profile-text">{this.props.userData.first_name} {this.props.userData.last_name}</h5>
                        <p className="profile-label">Sightings</p>
                    </div>
                </Row>
                <div className="profile-content-text">
                    <p className="profile-label">First Name</p>
                    <h5 className="profile-text">{this.props.userData.first_name}</h5>
                </div>
                <div className="profile-content-text">
                    <p className="profile-label">Last Name</p>
                    <h5 className="profile-text">{this.props.userData.last_name}</h5>
                </div>
                <div className="profile-content-text">
                    <p className="profile-label">Date of Birth</p>
                    <h4 className="profile-text">{this.props.dateOfBirth}</h4>
                </div>
                <div className="profile-content-text">
                    <p className="profile-label">Email Address</p>
                    <h4 className="profile-text">{this.props.email}</h4>
                </div>
                <div className="logout-button">
                    <Button onClick={() => {
                        this.props.loginSuccessful(false);
                        this.props.onHide(false);
                        this.props.setEmail('');
                        this.props.setDateOfBirth('');
                        this.props.setApiToken('');
                    }} className="button logout-button-modal Pink-background-gradient-color">Logout</Button>
                </div>
            </div>
        );
    }
}

export default Profile;