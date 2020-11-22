import React from 'react';
import { Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from '../actions';

class PublisherAuctionSlot extends React.Component {
    constructor(props) {
        super(props);
        
        this.getAuctionSlotDetails = this.getAuctionSlotDetails.bind(this);
    }
    
    getAuctionSlotDetails() {
        this.props.fetchPublisherAuctionSlotDetails(this.props.auctionSlot.Slot_ID);
        this.props.fetchBidsForAuctionSlot(this.props.auctionSlot.Slot_ID);
        this.props.fetchAuctionWinner(this.props.auctionSlot.Slot_ID);
    }
    
    render() {
        return (
           <tbody>
            <tr>
              <td>
                  <Link to="/auction">
                      <Button variant="primary" onClick={this.getAuctionSlotDetails}>
                        See Details Of Slot {this.props.auctionSlot.Slot_ID}
                      </Button>
                  </Link>
              </td>
              <td>{this.props.auctionSlot.Slot_Status}</td>
            </tr>
          </tbody>
        );
    }
}

export default connect(null, actions)(PublisherAuctionSlot);