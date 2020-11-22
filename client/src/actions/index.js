import axios from 'axios';
import { FETCH_USER, 
         UPDATE_SLOT_FOR_BID_OFFER, 
         FETCH_DETAILS_FOR_AUCTION_SLOT,
         FETCH_BIDS_FOR_AUCTION_SLOT
       } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data }); 
};

export const updateSlotForBidOffer = (slotID) => async dispatch => {
    const res = await axios.post('/api/update_slot_for_bid_offer' + slotID);
    dispatch({ type: UPDATE_SLOT_FOR_BID_OFFER, payload: res.data });
}

export const fetchPublisherAuctionSlotDetails = (slotID) => async dispatch => {
    const res = await axios.post('/api/publisher_auc_slot_details' + slotID);
    dispatch({ type: FETCH_DETAILS_FOR_AUCTION_SLOT, payload: res.data });
}

export const fetchBidsForAuctionSlot = (slotID) => async dispatch => {
    const res = await axios.post('/api/bids_for_auction_slot' + slotID);
    dispatch({ type: FETCH_BIDS_FOR_AUCTION_SLOT, payload: res.data });
}
