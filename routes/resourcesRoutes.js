const moment = require('moment');

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
        connection.query('SELECT AuctionSlot.Slot_ID,`Slot_Status`,AuctionSlot.Auction_ID,`Start_Bid_Price`,`Category_ID`,`End_Date`,`Auction_Winner` FROM `AuctionSlot` INNER JOIN `Auction` ON AuctionSlot.Slot_ID=Auction.Slot_ID WHERE AuctionSlot.Slot_ID = ?', req.params.slotid, function(error, results, fields) {
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
    
    app.get('/api/get_auc_slots_needed_to_be_closed', (req, res) => {
        connection.query('SELECT AuctionSlot.Slot_ID,`End_Date` FROM `AuctionSlot` INNER JOIN `Auction` ON AuctionSlot.Slot_ID=Auction.Slot_ID WHERE `Slot_Status` = ?', "On going", function(error, auctionSlots, fields) {
            if (error) {
                console.log(error);
            } else {
                let now = moment().startOf('day').format("YYYY-MM-DD");
                
                let filteredResults = auctionSlots.filter(auctionSlot => {
                   let date = moment(auctionSlot.End_Date).startOf('day').format("YYYY-MM-DD");
                   
                   if (!moment(date).isAfter(now, 'day')) {
                       auctionSlot.End_Date = date;
                       return true;
                   }
                   
                   return false;
                });
                
                res.send(filteredResults);
            }
        });
    });
    
    app.get('/api/close_auction_slot:slotId', (req, res) => {
        connection.beginTransaction(function(err) {
            if (err) {
                res.send({ failure: "Close auction slot transaction failed to begin." });
            } else {   
                connection.query('SELECT MAX(BidPrice) AS max FROM `BidOffer` WHERE `Slot_ID` = ?', req.params.slotId, function(error, maxResult, fields) {
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
                            connection.query('SELECT Advertiser.Advertiser_ID FROM `Advertiser` INNER JOIN `BidOffer` ON Advertiser.Advertiser_ID=BidOffer.Advertiser_ID WHERE `Slot_ID` = ? AND `BidPrice` = ?', [req.params.slotId, maxResult[0].max], function(error, auctionWinnerResult, fields) {
                                if (error) {
                                    return connection.rollback(function() {
                                        res.send({ failure: "Getting auction winner failed." }); 
                                    });
                                } else {
                                    connection.query('UPDATE `AuctionSlot` SET `Slot_Status` = ?,`Auction_Winner` = ? WHERE `Slot_ID` = ?', ["Auctioned", auctionWinnerResult[0].Advertiser_ID, req.params.slotId], function(error, updateAuctionSlotResults, fields) {
                                        if (error) {
                                            connection.commit(function() {
                                                res.send({ failure: "Update auction slot failed" });
                                            });
                                        } else {
                                            connection.commit(function() {
                                                console.log("Updated auction slot!");
                                            });
                                            
                                            connection.query('UPDATE `Advertiser` SET `BudgetedCost` = `BudgetedCost` - ? WHERE `Advertiser_ID` = ?', [maxResult[0].max, auctionWinnerResult[0].Advertiser_ID], function(error, updateAdvertiserBudgetResults, fields) {
                                                connection.rollback(function() {
                                                    if (error) {
                                                        connection.rollback({ failure: "Update advertiser failed." });
                                                    } else {
                                                        connection.commit(function() {
                                                            console.log("Updated advertiser!");
                                                            res.redirect('/');
                                                        });
                                                    }
                                                });
                                            });
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
