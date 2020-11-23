import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // gives ability to call action creators
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import AdvertiserSignUp from './AdvertiserSignUp';
import PublisherSignUp from './PublisherSignUp';
import AdministratorSignUp from './AdministratorSignUp';
import BidOffer from './BidOffer';
import AddAuctionSlot from './AddAuctionSlot';
import Auction from './Auction';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        return (
            <div className = "container">
                <BrowserRouter>
                    <Header />
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/adsignup" component={AdvertiserSignUp} />
                        <Route path="/pubsignup" component={PublisherSignUp} />
                        <Route path="/adminsignup" component={AdministratorSignUp} />
                        <Route path="/bidoffer" component={BidOffer} />
                        <Route path="/addaucslot" component={AddAuctionSlot} />
                        <Route path="/auction" component={Auction} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);