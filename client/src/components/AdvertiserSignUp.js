import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AdvertiserSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            advertiserName: '',
            adCreativeDescription: '',
            adBudget: 0,
            resultMessage: '',
            resultMessageColor: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    async handleSubmit() {
        if (this.state.password != this.state.confirmPassword) {
            this.setState({
                resultMessage: "Passwords do not match.",
                resultMessageColor: "#ff1a1a"
            });
        } else {
            let res = await axios({
                method: 'post',
                url: '/api/adsignup',
                data: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    advertiserName: this.state.advertiserName,
                    adCreativeDescription: this.state.adCreativeDescription,
                    adBudget: this.state.adBudget
                }
            });

            if (res.data.success) {
                this.setState({
                    resultMessage: res.data.success,
                    resultMessageColor: '#1aff1a'
                }); 
            } else if (res.data.failure) {
                this.setState({
                    resultMessage: res.data.failure,
                    resultMessageColor: '#ff1a1a'
                });
            }
        }
    }
    
    render() {
        return (
            <div>
                <h2>Advertiser Sign Up!</h2>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="firstName" placeholder="Enter first name" value={this.state.firstName} 
                       onChange={(e) => this.handleChange(e.target.value, 'firstName')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="lastName" placeholder="Enter last name" value={this.state.lastName} 
                       onChange={(e) => this.handleChange(e.target.value, 'lastName')} />
                  </Form.Group>
                
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} 
                       onChange={(e) => this.handleChange(e.target.value, 'email')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter password" value={this.state.password}
                       onChange={(e) => this.handleChange(e.target.value, 'password')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="confirmPassword" type="password" placeholder="Re-type password" value={this.state.confirmPassword}
                       onChange={(e) => this.handleChange(e.target.value, 'confirmPassword')} />
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicAdvertiserName">
                    <Form.Label>Advertiser Name</Form.Label>
                    <Form.Control name="advertiserName" type="text" placeholder="Enter advertiser name" value={this.state.advertiserName}
                       onChange={(e) => this.handleChange(e.target.value, 'advertiserName')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicAdCreativeDescription">
                    <Form.Label>Ad Creative Description</Form.Label>
                    <Form.Control name="adDescription" type="text" placeholder="Enter ad creative description" value={this.state.adCreativeDescription}
                       onChange={(e) => this.handleChange(e.target.value, 'adCreativeDescription')} />
                  </Form.Group>  

                  <Form.Group controlId="formBasicBudgetedCost">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control name="adBudget" type="number" placeholder="Enter budget" value={this.state.adBudget}
                       onChange={(e) => this.handleChange(e.target.value, 'adBudget')} />
                  </Form.Group>  

                  <Button variant="primary" onClick={this.handleSubmit}>
                    Submit
                  </Button>

                  <h3 style={{color: this.state.resultMessageColor, marginTop: '3%'}}>{this.state.resultMessage}</h3>
            </div>
        );
    }
}

export default AdvertiserSignUp;



/* 




            <div>
                <h2>Advertiser Sign Up!</h2>
                <Form action="/api/adsignup" method="post">
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="firstName" placeholder="Enter first name" value={this.state.firstName} 
                       onChange={(e) => this.handleChange(e.target.value, 'firstName')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="lastName" placeholder="Enter last name" value={this.state.lastName} 
                       onChange={(e) => this.handleChange(e.target.value, 'lastName')} />
                  </Form.Group>
                
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} 
                       onChange={(e) => this.handleChange(e.target.value, 'email')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter password" value={this.state.password}
                       onChange={(e) => this.handleChange(e.target.value, 'password')} />
                  </Form.Group>
                  
                  <Form.Group controlId="formBasicAdvertiserName">
                    <Form.Label>Advertiser Name</Form.Label>
                    <Form.Control name="advertiserName" type="text" placeholder="Enter advertiser name" value={this.state.advertiserName}
                       onChange={(e) => this.handleChange(e.target.value, 'advertiserName')} />
                  </Form.Group>

                  <Form.Group controlId="formBasicAdCreativeDescription">
                    <Form.Label>Ad Creative Description</Form.Label>
                    <Form.Control name="adDescription" type="text" placeholder="Enter ad creative description" value={this.state.adCreativeDescription}
                       onChange={(e) => this.handleChange(e.target.value, 'adCreativeDescription')} />
                  </Form.Group>  

                  <Form.Group controlId="formBasicBudgetedCost">
                    <Form.Label>Ad Creative Description</Form.Label>
                    <Form.Control name="adBudget" type="number" placeholder="Enter budget" value={this.state.adBudget}
                       onChange={(e) => this.handleChange(e.target.value, 'adBudget')} />
                  </Form.Group>  

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </div>
            
            
            */

