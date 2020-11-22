import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class AddAuctionSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startBidPrice: 0,
            endMonth: 1,
            endDay: 1,
            endYear: 2020,
            category: 1
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(value, property) {
        this.setState({[property]: value});
    }
    
    async handleSubmit() {
        if (this.state.startBidPrice === 0) {
            this.setState({
                resultMessage: 'You must have a start bid higher than $0',
                resultMessageColor: '#ff1a1a'
            });
        } else {
            let res = await axios({
                method: 'post',
                url: '/api/add_auction_slot',
                data: {
                    publisherId: this.props.auth.Publisher_ID,
                    startBidPrice: this.state.startBidPrice,
                    endMonth: this.state.endMonth,
                    endDay: this.state.endDay, 
                    endYear: this.state.endYear,
                    category: this.state.category
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
        console.log(this.props.auth.Publisher_ID);
        return (
            <div>
              <h2 style={{ marginBottom: '5%' }}>Add auction slot!</h2>
              <Form.Group controlId="formBasicStartBidOffer">
                <Form.Label>Enter Start Bid Amount</Form.Label>
                <Form.Control name="startBidPrice" type="number" placeholder="Enter bid amount" value={this.state.startBidPrice} 
                   onChange={(e) => this.handleChange(e.target.value, 'startBidPrice')} />
              </Form.Group>
                
              <h6 style={{ marginTop: '5%' }}>Auction Slot End Date</h6>
              <div>
                <label style={{ marginTop: '1%', marginRight: '1%'}}>Select Month</label>
                <select name="endMonth" id="endMonth" onChange={(e) => this.handleChange(e.target.value, 'endMonth')}>
                  <option value={1}>{1}</option>
                  <option value={2}>{2}</option>
                  <option value={3}>{3}</option>
                  <option value={4}>{4}</option>
                  <option value={5}>{5}</option>
                  <option value={6}>{6}</option>
                  <option value={7}>{7}</option>
                  <option value={8}>{8}</option>
                  <option value={9}>{9}</option>
                  <option value={10}>{10}</option>
                  <option value={11}>{11}</option>
                  <option value={12}>{12}</option>
                </select>

                <label style={{marginLeft: '2%', marginRight: '1%'}}>Select Day</label>
                <select name="endDay" id="endDay" onChange={(e) => this.handleChange(e.target.value, 'endDay')}>
                  <option value={1}>{1}</option>
                  <option value={2}>{2}</option>
                  <option value={3}>{3}</option>
                  <option value={4}>{4}</option>
                  <option value={5}>{5}</option>
                  <option value={6}>{6}</option>
                  <option value={7}>{7}</option>
                  <option value={8}>{8}</option>
                  <option value={9}>{9}</option>
                  <option value={10}>{10}</option>
                  <option value={11}>{11}</option>
                  <option value={12}>{12}</option>
                  <option value={13}>{13}</option>
                  <option value={14}>{14}</option>
                  <option value={15}>{15}</option>
                  <option value={16}>{16}</option>
                  <option value={17}>{17}</option>
                  <option value={18}>{18}</option>
                  <option value={19}>{19}</option>
                  <option value={20}>{20}</option>
                  <option value={21}>{21}</option>
                  <option value={22}>{22}</option>
                  <option value={23}>{23}</option>
                  <option value={24}>{24}</option>
                  <option value={25}>{25}</option>
                  <option value={26}>{26}</option>
                  <option value={27}>{27}</option>
                  <option value={28}>{28}</option>
                  <option value={29}>{29}</option>
                  <option value={30}>{30}</option>
                  <option value={31}>{31}</option>
                </select>

                <label style={{marginLeft: '2%', marginRight: '1%'}}>Select Year</label>
                <select name="endYear" id="endYear" onChange={(e) => this.handleChange(e.target.value, 'endYear')}>
                  <option value={2020}>{2020}</option>
                  <option value={2021}>{2021}</option>
                </select>
              </div>

              <h6 style={{ marginTop: '1%' }}>**Reminder** Please check that the date is an appropriate date.</h6>

              <div>
                <label style={{marginTop: '5%', marginRight: '1%'}}>Select Category</label>
                <select name="category" id="category" onChange={(e) => this.handleChange(e.target.value, 'category')}>
                  <option value={1}>Top Right of the page</option>
                  <option value={2}>Top Left of the page</option>
                  <option value={3}>Left Middle of the page</option>
                  <option value={4}>Right Middle of the page</option>
                </select>
              </div>

              <Button variant="primary" style={{ marginTop: '5%' }} onClick={this.handleSubmit}>
                Submit
              </Button>

              <h3 style={{color: this.state.resultMessageColor, marginTop: '3%'}}>{this.state.resultMessage}</h3>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(AddAuctionSlot);