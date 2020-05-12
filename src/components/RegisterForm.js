import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Col, Nav } from 'react-bootstrap';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false
        }
    }

    submit = values => {
        fetch("https://flowrspot-api.herokuapp.com/api/v1/users/register", {
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
                    this.props.setDateOfBirth(values.date_of_birth);
                    if (result.auth_token != null) {
                        this.props.setApiToken(result.auth_token);
                        this.props.signupModal(false);
                        this.props.signupSuccess(true);
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
        const { error, isLoading, handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.submit)}>
                    <Form.Row className="sign-up-modal">
                        <Form.Group as={Col} md="6">
                            <Form.Label>First name</Form.Label>
                            <Field className="form-control" name="first_name" component='input'
                                required type="text" placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Last name</Form.Label>
                            <Field className="form-control" name="last_name" component="input"  required type="text" placeholder="Enter LastName" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Date of Birth</Form.Label>
                        <Field className="form-control" name="date_of_birth" component="input" required type="text" placeholder="May 03, 1980" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Email address</Form.Label>
                        <Field className="form-control" name="email" component="input" required type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Field className="form-control" name="password" component="input" type="password" placeholder="Enter Password" required />
                    </Form.Group>
                    <div className="sign-up-modal">
                        <Button type="submit" label="submit" id="create-account-button" className="button Pink-background-gradient-color col">{isLoading ? 'Loading...' : 'Create Account'}</Button>
                    </div>
                </form>
                <Nav.Link onClick={() =>
                    this.props.signupModal(false)} className="text-center no-register-button">I don't want to register</Nav.Link>
            </div >);
    }
}

RegisterForm = reduxForm({
    form: 'signUp'
})(RegisterForm);

export default RegisterForm;