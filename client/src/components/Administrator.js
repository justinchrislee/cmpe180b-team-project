import React from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import AdministratorCloseAuctionSlot from './AdministratorCloseAuctionSlot';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Administrator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            closeAuctionSlots: []
        }
        
        this.renderCloseAuctionSlots = this.renderCloseAuctionSlots.bind(this);
    }
    
    async componentDidMount() {
        let res = await axios({
            method: 'get',
            url: '/api/get_auc_slots_needed_to_be_closed'
        });
        
        if (res.data) {
            this.setState({
                closeAuctionSlots: res.data
            });
        }
    } 
    
    renderCloseAuctionSlots(closeAuctionSlot, index) {
        return (
           <AdministratorCloseAuctionSlot key={index} closeAuctionSlot={closeAuctionSlot} />
        );
    } 
    
    render() {
        return (
            <div>
                <h2 style={{ marginBottom: '2%' }}>Welcome to your Administrator page,  {this.props.auth.First_Name}!</h2>
                <h5 style={{ marginTop: '5%', marginBottom: '1%' }}>Auction Slots Needed To Be Closed</h5>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Slot_ID</th>
                      <th>End_Date</th>
                      <th>Close Auction Slot</th>
                    </tr>
                  </thead>
                  {this.state.closeAuctionSlots.map(this.renderCloseAuctionSlots)}
                </Table>
            </div>
        );
    }
}

export default Administrator;