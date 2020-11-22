module.exports = (app, connection) => {
    app.get('/api/available_auction_slots', (req, res) => {
        connection.query('SELECT `Publisher_Name`,`Slot_ID`,`Auction_ID`,`Category_ID`,`Start_Bid_Price` FROM `Publisher` INNER JOIN `AuctionSlot` ON Publisher.Publisher_ID=AuctionSlot.Publisher_ID WHERE `Slot_Status` = ?',"On going", function(error, results, fields) {
            if (error) {
                console.log("Available auction slot query failed.");
            } else {
                res.send(results);
            }
        });
    });
    
    app.post('/api/publisher_auction_slots', (req, res) => {
        connection.query('SELECT `Slot_ID`,`Slot_Status` FROM `AuctionSlot` WHERE `Publisher_ID` = ?', req.body.Publisher_ID, function(error, results, fields) {
            if (error) {
                console.log(error);
                console.log("Publisher auction slot query failed.");
            } else {
                res.send(results);
            }
        });
    });
    
    app.post('/api/update_slot_for_bid_offer:slotid', (req, res) => {
        connection.query('SELECT `Publisher_ID`,`Slot_ID`,`Auction_ID`,`Start_Bid_Price`  FROM `AuctionSlot` WHERE `Slot_ID` = ?', req.params.slotid, function(error, results, fields) {
           if (error) {
               console.log(error);
               res.send("Update slot for bid offer query failed");
           } else {
               res.send(results);
           }
        });
    });
    
    app.post('/api/publisher_auc_slot_details:slotid', (req, res) => {
        connection.query('SELECT AuctionSlot.Slot_ID,`Slot_Status`,AuctionSlot.Auction_ID,`Start_Bid_Price`,`Category_ID`,`End_Date` FROM `AuctionSlot` INNER JOIN `Auction` ON AuctionSlot.Slot_ID=Auction.Slot_ID WHERE AuctionSlot.Slot_ID = ?', req.params.slotid, function(error, results, fields) {
            if (error) {
                res.send("Retrieving publisher auction slot details failed");
            } else {
                res.send(results);
            }
        });
    });
    
    app.post('/api/bids_for_auction_slot:slotid', (req, res) => {
        connection.query('SELECT * FROM `BidOffer` WHERE `Slot_ID` = ?', req.params.slotid, function(error, results, fields) {
            if (error) {
                res.send("Getting bids for auction slot failed");
            } else {
                res.send(results);
            }
        });
        
    });
    
    app.post('/api/get_auction_winner:slotid', (req, res) => {
        connection.beginTransaction(function(err) {
            if (err) {
                res.send({ failure: "Transaction failed." })
            } else {
                connection.query('SELECT MAX(BidPrice) AS max FROM `BidOffer` WHERE `Slot_ID` = ?', req.params.slotid, function(error, maxResult, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            res.send({ failure: "Attaining max bid offer failed." });
                        });
                    } else {
                        if (maxResult[0].max == null) {
                            return connection.rollback(function() {
                                res.send({ failure: "No bids have been received." });
                            });
                        } else {
                            connection.query('SELECT `Advertiser_ID` FROM `BidOffer` WHERE `BidPrice` = ?', maxResult[0].max, function(error, bidsWithMaxBidOffer, fields) {
                                if (error) {
                                    return connection.rollback(function() {
                                        res.send({ failure: "Getting all bids with max offer failed." });
                                    });
                                } else {
                                    connection.commit(function(err) {
                                        if (err) {
                                            return connection.rollback(function() {
                                                res.send({ failure: "Committing transaction failed." });
                                            });
                                        } else {
                                            res.send({ success: bidsWithMaxBidOffer });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    });
};