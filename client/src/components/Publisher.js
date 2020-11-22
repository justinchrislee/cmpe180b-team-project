import React from 'react';
import PublisherAuctionSlot from './PublisherAuctionSlot';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Publisher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisherAuctionSlots: []
        }
    }
    
    async componentDidMount() {
        let res = await axios({
            method: 'post',
            url: '/api/publisher_auction_slots',
            data: {
                Publisher_ID: this.props.auth.Publisher_ID
            }
        });
        
        if (res.data.length > 0) {
            this.setState({
                publisherAuctionSlots: res.data
            });
        }
    }
    
    renderPublisherAuctionSlots(auctionSlot, index) {
        return (
           <PublisherAuctionSlot key={index} auctionSlot={auctionSlot} />
        );
    }
    
    render() {
        return (
             <div>
                <h2 style={{ marginBottom: '5%' }}>Welcome to your publisher page,  {this.props.auth.Publisher_Name}!</h2>
                <h5>Your Auction Slots</h5>
                <Table striped bordered hover size="sm" style={{ marginBottom: '10%' }}>
                  <thead>
                    <tr>
                      <th>Auction Slot</th>
                      <th>Slot_Status</th>
                    </tr>
                  </thead>
                  {this.state.publisherAuctionSlots.map(this.renderPublisherAuctionSlots)}   
                </Table>
                
                <Link to="/addaucslot">
                   <Button variant="primary">
                    Add auction slot
                   </Button>
                </Link>
            </div>
        );
    }
}

export default Publisher;
