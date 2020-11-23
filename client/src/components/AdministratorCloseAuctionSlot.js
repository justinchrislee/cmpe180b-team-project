import React from 'react';
import { Button } from 'react-bootstrap'; 
import axios from 'axios';

class AdministratorCloseAuctionSlot extends React.Component {
    constructor(props) {
        super(props);
        
        this.closeAuctionSlot = this.closeAuctionSlot.bind(this);
    }
    
    closeAuctionSlot() {
        axios({
            method: 'post',
            url: '/api/close_auction_slot',
            data: {
                slotId: this.props.closeAuctionSlot.Slot_ID
            }
        });
    }
    
    render() {
        return (
           <tbody>
            <tr>
              <td>{this.props.closeAuctionSlot.Slot_ID}</td>
              <td>{this.props.closeAuctionSlot.End_Date}</td>
              <td>
                  <Button variant="primary" style={{ backgroundColor: 'red' }}>
                    <a href={"/api/close_auction_slot" + this.props.closeAuctionSlot.Slot_ID} style={{ color: 'white' }}>Close Auction Slot</a>
                  </Button>
              </td>
            </tr>
          </tbody>
        );
    }
}

export default AdministratorCloseAuctionSlot