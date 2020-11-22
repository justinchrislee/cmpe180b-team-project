import React from 'react';
import { Button, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from '../actions';

class AvailableAuctionRow extends React.Component {
    constructor(props) {
        super(props);
        
        this.updateCurrentSlotForBidOffer = this.updateCurrentSlotForBidOffer.bind(this);
    }
    
    updateCurrentSlotForBidOffer() {
        this.props.updateSlotForBidOffer(this.props.auctionSlot.Slot_ID);
    }
    
    render() {
        return (
          <tbody>
            <tr>
              <td>{this.props.auctionSlot.Publisher_Name}</td>
              <td>{this.props.auctionSlot.Slot_ID}</td>
              <td>{this.props.auctionSlot.Auction_ID}</td>
              <td>${this.props.auctionSlot.Start_Bid_Price}</td>
              <td>{this.props.auctionSlot.Category_ID}</td>
              <td>
                 <Link to="/bidoffer">
                       <Button variant="primary" onClick={this.updateCurrentSlotForBidOffer}>
                        Place Bid
                       </Button>
                 </Link>
              </td>
            </tr>
          </tbody>
        );
    }
}

export default connect(null, actions)(AvailableAuctionRow);