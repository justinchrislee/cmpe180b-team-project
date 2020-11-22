import { combineReducers } from 'redux';
import authReducer from './authReducer';
import updateSlotReducer from './updateSlotReducer';
import publisherAucSlotDetailsReducer from './publisherAucSlotDetailsReducer';
import bidsForAuctionSlotReducer from './bidsForAuctionSlotReducer';

export default combineReducers({
    auth: authReducer,
    bidSlot: updateSlotReducer,
    publisherAuctionSlotDetails: publisherAucSlotDetailsReducer,
    bidsForAuctionSlot: bidsForAuctionSlotReducer
});