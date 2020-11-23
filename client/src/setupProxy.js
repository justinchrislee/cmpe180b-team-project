const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/random', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/adsignup', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/pubsignup', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/adminsignup', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/login', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/bidoffer', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/add_auction_slot', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/logout', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/current_user', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/available_auction_slots', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/publisher_auction_slots', { target: 'http://localhost:5000 '}));
    app.use(proxy('/api/update_slot_for_bid_offer', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/publisher_auc_slot_details', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/bids_for_auction_slot', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/get_auction_winner', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/get_auc_slots_needed_to_be_closed', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/close_auction_slot', { target: 'http://localhost:5000' }));
};