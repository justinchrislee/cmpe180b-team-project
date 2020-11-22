import { FETCH_DETAILS_FOR_AUCTION_SLOT } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case (FETCH_DETAILS_FOR_AUCTION_SLOT):
            return action.payload;
        default: 
            return state;
    }
}