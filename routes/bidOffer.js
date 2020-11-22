module.exports = (app, connection) => {
    app.post('/api/bidoffer', (req, res) => {    
        connection.query('SELECT * FROM `BidOffer` WHERE `Advertiser_ID` = ? AND `Slot_ID` = ?', [req.body.advertiserId, req.body.slotId], function(error, results, fields) {
            if (error) {
                res.send({ failure: "Querying for bid offer failed to begin." });
            } else {
                if (results.length > 0) {
                    connection.rollback(function() {
                        res.send({ failure: "You've already submitted a bid for this slot." });
                    });
                } else {
                    const bidOffer = {
                        Advertiser_ID: req.body.advertiserId,
                        Slot_ID: req.body.slotId,
                        BidPrice: req.body.bidAmount,
                        Auction_ID: req.body.auctionId,
                        Payment_Method_ID: req.body.paymentMethod
                    }
                    connection.query('INSERT INTO `BidOffer` SET ?', bidOffer, function(error, results, fields) {
                        if (error) {
                            connection.rollback(function() {
                                res.send({ failure: "Insertion into BidOffer failed." }); 
                            });
                        } else {
                            connection.commit(function() {
                                 res.send({ success: "You've successfully submitted your bid!" });
                            });
                        }
                    });
                }
            }
        });
    });
};
