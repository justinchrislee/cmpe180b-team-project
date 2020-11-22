import { UPDATE_SLOT_FOR_BID_OFFER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case (UPDATE_SLOT_FOR_BID_OFFER):
            return action.payload;
        default: 
            return state;
    }
}