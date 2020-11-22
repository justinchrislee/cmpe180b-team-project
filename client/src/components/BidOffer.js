import React from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect} from 'react-redux';
import axios from 'axios';

class BidOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bidAmount: 0, 
            paymentMethod: 30,
            resultMessage: '',
            resultMessageColor: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderRows = this.renderRow.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    async handleSubmit() {  
        if (this.props.bidSlot == null) {
            this.setState({
                resultMessage: "Unspecified auction slot. Go back to home page and click place bid next to available auction slot",
                resultMessageColor: '#ff1a1a'
            }); 
        } else if (this.state.bidAmount > this.props.auth.BudgetedCost) {
            this.setState({
                resultMessage: "Your bid amount exceeds your budget cost.",
                resultMessageColor: '#ff1a1a'
            }); 
        } else if (this.state.bidAmount < this.props.bidSlot[0].Start_Bid_Price) {
            this.setState({
                resultMessage: "Your bid isn't high enough.",
                resultMessageColor: '#ff1a1a'
            }); 
        } else {
            let res = await axios({
                method: 'post',
                url: '/api/bidoffer',
                data: {
                    advertiserId: this.props.auth.Advertiser_ID,
                    slotId: this.props.bidSlot[0].Slot_ID,
                    bidAmount: this.state.bidAmount,
                    auctionId: this.props.bidSlot[0].Auction_ID,
                    paymentMethod: this.state.paymentMethod
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
        
    renderRow(index) {
        if (this.props.bidSlot != null) {        
            return (
              <tbody key={index}>
                <tr>
                  <td>{this.props.bidSlot[0].Publisher_ID}</td>
                  <td>{this.props.bidSlot[0].Slot_ID}</td>
                  <td>{this.props.bidSlot[0].Auction_ID}</td>
                  <td>${this.props.bidSlot[0].Start_Bid_Price}</td>
                </tr>
              </tbody>
            );
        } else {
            return;
        }
    }
    
    render() {
        console.log("INSIDE BID OFFER");
        console.log(this.props.bidSlot);
        return (
            <div>
                <h2>Bid Offer</h2>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Publisher_ID</th>
                      <th>Slot_ID</th>
                      <th>Auction_ID</th>
                      <th>Start_Bid_Price</th>
                    </tr>
                  </thead>
                  {this.renderRows()}
                </Table>
            
             
                  <Form.Group controlId="formBasicBidOffer">
                    <Form.Label>Enter Bid Amount</Form.Label>
                    <Form.Control name="bidOffer" type="number" placeholder="Enter bid amount" value={this.state.bidAmount} 
                       onChange={(e) => this.handleChange(e.target.value, 'bidAmount')} />
                  </Form.Group>
                    
                    <div>
                        <label style={{marginRight: '1%'}}>Select Payment Method</label>
                        <select name="paymentMethods" id="paymentMethods" onChange={(e) => this.handleChange(e.target.value, 'paymentMethod')}>
                          <option value={30}>Master Credit Card</option>
                          <option value={31}>Master Debit Card</option>
                          <option value={32}>Visa Debit Card</option>
                          <option value={33}>Visa Credit Card</option>
                        </select>
                    </div>

                  <Button variant="primary" onClick={this.handleSubmit}>
                    Submit Bid
                  </Button>
           
                <h3 style={{color: this.state.resultMessageColor, marginTop: '3%'}}>{this.state.resultMessage}</h3>
            </div>
        );
    }
}

function mapStateToProps({ bidSlot, auth }) {
    return { bidSlot, auth };
}

export default connect(mapStateToProps)(BidOffer);