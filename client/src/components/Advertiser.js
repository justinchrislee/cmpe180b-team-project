import React from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import AvailableAuctionRow from './AvailableAuctionRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Advertiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableAuctionSlots: []
        }
        
        this.renderAuctionSlots = this.renderAuctionSlots.bind(this);
    }
    
    async componentDidMount() {
        let res = await axios({
            method: 'get',
            url: '/api/available_auction_slots'
        });
        
        if (res.data.length > 0) {
            this.setState({
                availableAuctionSlots: res.data
            });
        }
    }
    
    renderAuctionSlots(auctionSlot, index) {
        return (
           <AvailableAuctionRow key={index} auctionSlot={auctionSlot} />
        );
    }
    
    render() {
        return (
            <div>
                <h2 style={{ marginBottom: '2%' }}>Welcome to your advertiser page,  {this.props.auth.Advertiser_Name}!</h2>
                <h5>Your Ad Creative: "{this.props.auth.Ad_Description}"</h5>
                <h5 style={{ marginBottom: '7%' }}>Your Budgeted Cost: ${this.props.auth.BudgetedCost}</h5>
                <h5>Available Auction Slots</h5>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Publisher_Name</th>
                      <th>Slot_ID</th>
                      <th>Auction_ID</th>
                      <th>Start_Bid_Price</th>
                      <th>Category_ID</th>
                      <th>Place Bid</th>
                    </tr>
                  </thead>
                  {this.state.availableAuctionSlots.map(this.renderAuctionSlots)}
                </Table>
            </div>
        );
    }
}

export default Advertiser;