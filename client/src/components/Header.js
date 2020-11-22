import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderLoginLogoutTab = this.renderLoginLogoutTab.bind(this);
    }
        
    renderLoginLogoutTab() {
        if (this.props.auth == null) {
            return;
        } else if (this.props.auth == false) {
            return (
                <Link to="/login">
                    <Button variant="outline-primary" style={{ color: 'white' }}>Login</Button>
                </Link>
            );
        } else {
            return (
                <a href="/api/logout" style={{ color: 'white' }}>Logout</a>
            );
        }
    }
    
    render() {
        return (
            <div style={{ marginBottom: '5%'}}>
              <Navbar bg="primary" variant="dark">
                <Link to="/">
                    <Navbar.Brand href="#home">Real Time Bidding</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">        
                </Nav>
                <Form inline>
                    {this.renderLoginLogoutTab()}
                </Form>
              </Navbar>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);