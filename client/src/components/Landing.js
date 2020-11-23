import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        return (
            <div>
                <Card className="text-center">
                  <Card.Header></Card.Header>
                  <Card.Body>
                    <Card.Title>Auctioning Ad-Space Simulation</Card.Title>
                    <Card.Text>
                      Don't have an account? Sign up as an advertiser or publisher below!
                    </Card.Text>
                    <Link to="/adsignup">
                        <Button variant="primary">Sign up as an advertiser!</Button>
                    </Link>
                    <Link to="/pubsignup">
                        <Button style={{ marginLeft: '1%' }}variant="primary">Sign up as a publisher!</Button>
                    </Link>
                    <Link to="/adminsignup">
                        <Button style={{ marginLeft: '1%' }}variant="primary">Apply to be an administrator!</Button>
                    </Link>
                  </Card.Body>
                  <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Landing;