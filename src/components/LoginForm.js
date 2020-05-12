import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Col, Nav } from 'react-bootstrap';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false
        }
    }

    submit = values => {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    this.props.setEmail(values.email);
                    if (result.auth_token != null) {
                        this.props.loginModal(false);
                        this.props.setApiToken(result.auth_token);
                        this.props.loginSuccessful(true);
                        this.props.loginSuccessModal(true);
                    } else if (result.auth_token == null) {
                        this.setState({
                            error: result.error
                        })
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.submit)}>
                    <Form.Group as={Col}>
                        <Form.Label>Email address</Form.Label>
                        <Field className="form-control" name="email" component="input" type="email" placeholder="name@example.com" value={this.props.email} required />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Field className="form-control" name="password" component="input" type="password" placeholder="Enter Password" required />
                    </Form.Group>
                    <div className="sign-up-modal">
                        <Button type="submit" label="submit" id="create-account-button" className="button Pink-background-gradient-color col">Login to your Account</Button>
                    </div>
                </form>
                <Nav.Link onClick={() =>
                    this.props.loginModal(false)} className="text-center no-register-button">I don't want to login</Nav.Link>
            </div>
        );
    }

}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;