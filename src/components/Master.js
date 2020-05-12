import React, { Component } from 'react';
import { Form, Button, Modal, } from 'react-bootstrap';
import Search from '@material-ui/icons/Search';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './Profile';
import Navbar from './Navbar';
import FetchFlowers from './FetchFlowers';

class Master extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showSignupModal: false,
            isSignupSuccessful: false,
            showLoginModal: false,
            isLoginSuccessful: false,
            loginSuccessModal: false,
            showProfileModal: false,
            isLoaded: false,
            userFromDatabase: [],
            clientToken: '',
            email: '',
            dateOfBirth: '',
            sightings: ''
        };
    }

    componentDidMount() {
        this.checkUserToken();
        this.getSightings();
    }

    render() {
        return (
            <div>
                <Navbar
                    signupModal={this.showSignupModal}
                    loginModal={this.showLoginModal}
                    loginState={this.state.isLoginSuccessful}
                    userData={this.state.userFromDatabase}
                    showProfile={this.showProfileModal}
                />

                <div className="Main-container">
                    <div className="Main-content text-light">
                        <h1>Discover flowers around you</h1>
                         <p>Explore between more than {this.state.sightings.length} sightings</p>
                        <div id="main-content-form">
                            <Form id="main-form">
                                <Form.Control id="form-basic-text" type="text" placeholder="Looking for something specific?" />
                                <Search id="material-icon" className="Primary-color" />
                            </Form>
                        </div>
                    </div>
                </div>

                <FetchFlowers loginState={this.state.isLoginSuccessful} authToken={this.state.clientToken} />

                <SignupModal
                    show={this.state.showSignupModal}
                    onHide={() => this.showSignupModal(false)}
                    signupModal={this.showSignupModal}
                    signupSuccess={this.signupSuccessful}
                    setEmail={this.setEmail}
                    setDateOfBirth={this.setDateOfBirth}
                    setApiToken={this.setApiToken}
                />
                <SuccessSignupModal
                    show={this.state.isSignupSuccessful}
                    onHide={() => this.signupSuccessful(false)}
                    showLogin={this.showLoginModal} />

                <LoginModal
                    show={this.state.showLoginModal}
                    onHide={() => this.showLoginModal(false)}
                    loginModal={this.showLoginModal}
                    loginSuccessful={this.loginSuccessful}
                    loginSuccessModal={this.showLoginSuccessModal}
                    email={this.state.email}
                    setEmail={this.setEmail}
                    setApiToken={this.setApiToken}
                />

                <SuccessLoginModal
                    show={this.state.loginSuccessModal}
                    onHide={() => this.showLoginSuccessModal(false)}
                    showProfile={this.showProfileModal} />

                <ProfileModal
                    show={this.state.showProfileModal}
                    onHide={() => this.showProfileModal(false)}
                    userData={this.state.userFromDatabase}
                    email={this.state.email}
                    dateOfBirth={this.state.dateOfBirth}
                    setEmail={this.setEmail}
                    setDateOfBirth={this.setDateOfBirth}
                    setApiToken={this.setApiToken}
                    loginSuccessful={this.loginSuccessful}
                    showProfile={this.showProfileModal}
                />
            </div>
        );
    }

    async getUserDetails() {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/users/me", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.clientToken,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userFromDatabase: result.user
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    signupSuccessful = (value) => {
        this.setState({
            isSignupSuccessful: value
        });
        this.checkUserToken();
    }

    showSignupModal = (value) => {
        this.setState({
            showSignupModal: value
        });
    }

    showLoginModal = (value) => {
        this.setState({
            showLoginModal: value
        });
    }

    loginSuccessful = (value) => {
        this.setState({
            isLoginSuccessful: value
        });
        this.checkUserToken();
    }

    showLoginSuccessModal = (value) => {
        this.setState({
            loginSuccessModal: value
        });
    }

    showProfileModal = (value) => {
        this.setState({
            showProfileModal: value
        });
    }

    setEmail = (value) => {
        this.setState({
            email: value
        });
    }

    setDateOfBirth = (value) => {
        this.setState({
            dateOfBirth: value
        });
    }

    setApiToken = (value) => {
        this.setState({
            clientToken: value
        });
    }

    checkUserToken() {
        if (this.state.clientToken.length > 0) {
            this.getUserDetails();
        }
    }

    async getSightings() {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/sightings", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        sightings: result.sightings
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
}

function SignupModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Modal.Title id="contained-modal-title-vcenter" className="signup-modal-title text-center justify-content-center">
                    Create an Account
                </Modal.Title>
                <RegisterForm
                    signupModal={props.signupModal}
                    signupSuccess={props.signupSuccess}
                    setEmail={props.setEmail}
                    setDateOfBirth={props.setDateOfBirth}
                    setApiToken={props.setApiToken}
                />
            </Modal.Body>
        </Modal>
    );
}

function SuccessSignupModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className="success-signup-modal">
                <h4 className="signup-modal-title">Congratulations! You have successfully signed up for FlowrSpot!</h4>
                <div className="ok-button">
                    <Button onClick={() => {
                        props.onHide(false);
                        props.showLogin(true);
                    }} className="button Pink-background-gradient-color">OK</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function LoginModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Modal.Title id="contained-modal-title-vcenter" className="modal-title text-center justify-content-center">
                    Welcome back
                </Modal.Title>
                <LoginForm
                    loginModal={props.loginModal}
                    loginSuccessful={props.loginSuccessful}
                    loginSuccessModal={props.loginSuccessModal}
                    email={props.email}
                    setEmail={props.setEmail}
                    setApiToken={props.setApiToken} />
            </Modal.Body>
        </Modal>
    );
}

function SuccessLoginModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className="success-signup-modal">
                <h4 className="signup-modal-title">Congratulations! You have successfully logged into FlowrSpot!</h4>
                <div className="ok-button">
                    <Button onClick={() => {
                        props.onHide(false);
                    }} className="button ok-button-modal Pink-background-gradient-color">OK</Button>
                    <Button onClick={() => {
                        props.onHide(false);
                        props.showProfile(true);
                    }} className="button Pink-background-gradient-color">Profile</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function ProfileModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className="profile-modal">
                <Profile 
                    onHide={props.onHide}
                    userData={props.userData} 
                    email={props.email} 
                    dateOfBirth={props.dateOfBirth} 
                    setEmail={props.setEmail}
                    setDateOfBirth={props.setDateOfBirth}
                    setApiToken={props.setApiToken}
                    loginSuccessful={props.loginSuccessful}
                    showProfile={props.showProfileModal}
                    />
            </Modal.Body>
        </Modal>
    );
}

export default Master