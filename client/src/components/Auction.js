import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class Auction extends React.Component {
    constructor(props) {
        super(props);
              
        this.renderAuctionDetails = this.renderAuctionDetails.bind(this);
        this.renderBidDetails = this.renderBidDetails.bind(this);
    }
    
    renderAuctionDetails() {
        if (this.props.publisherAuctionSlotDetails) {    
            return (
                <tbody>
                    <tr>
                      <td>{this.props.publisherAuctionSlotDetails[0].Slot_ID}</td>
                      <td>{this.props.publisherAuctionSlotDetails[0].Slot_Status}</td>
                      <td>{this.props.publisherAuctionSlotDetails[0].Auction_ID}</td>
                      <td>${this.props.publisherAuctionSlotDetails[0].Start_Bid_Price}</td>
                      <td>{this.props.publisherAuctionSlotDetails[0].End_Date.substring(0, 10)}</td>
                    </tr> 
                </tbody>
            );
        } else {
            return;
        }
    }
        
    renderBidDetails(bid, index) {
        return (
            <tbody key={index}>
                <tr>
                  <td>{bid.Advertiser_ID}</td>
                  <td>{bid.Slot_ID}</td>
                  <td>${bid.BidPrice}</td>
                  <td>{bid.Auction_ID}</td>
                  <td>{bid.Payment_Method_ID}</td>
                </tr>
              </tbody>
        );
    }
    
    render() {
        return (
             <div>
                <h2 style={{ marginBottom: '5%' }}>Auction Slot, Auction, & Bidding Details</h2>
                <h5>Auction & Auction Slot Details</h5>
                <Table striped bordered hover size="sm" style={{ marginBottom: '10%' }}>
                  <thead>
                    <tr>
                      <th>Slot_ID</th>
                      <th>Slot_Status</th>
                      <th>Auction_ID</th>
                      <th>Start_Bid_Price</th>
                      <th>End_Date</th>
                    </tr>
                  </thead>
                  {this.renderAuctionDetails()}
                </Table>
            
                <h5>Bids Received</h5>
                <Table striped bordered hover size="sm" style={{ marginBottom: '10%' }}>
                  <thead>
                    <tr>
                      <th>Advertiser_ID</th>
                      <th>Slot_ID</th>
                      <th>BidPrice</th>
                      <th>Auction_ID</th>
                      <th>Payment_Method_ID</th>
                    </tr>
                  </thead>
                  {
                      this.props.bidsForAuctionSlot ? 
                      (this.props.bidsForAuctionSlot.map(this.renderBidDetails)) : 
                      (<div></div>) 
                  }                                                                                       
                </Table>
                       
                <div style={{ marginTop: '5%' }}>
                  <h4>Auction Winner: N/A</h4>
                </div>  
            </div>
        );
    }
}

function mapStateToProps({ publisherAuctionSlotDetails, bidsForAuctionSlot }) {
    return { publisherAuctionSlotDetails, bidsForAuctionSlot };
}

export default connect(mapStateToProps)(Auction);