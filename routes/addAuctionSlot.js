const moment = require('moment');

module.exports = (app, connection) => {
    app.post('/api/add_auction_slot', (req, res) => {    
        connection.beginTransaction(function(err) {
            if (err) {
                res.send({ failure: "Transaction couldn't start up."});
            }
            
            connection.query('SELECT COUNT(*) AS count FROM `AuctionSlot`', function(error, auctionSlotCount, fields) {
                if (error) {
                    return connection.rollback(function() {
                        res.send({ failure: "Transaction failed." }); 
                    });
                } else {
                    connection.query('SELECT COUNT(*) AS count FROM `Auction`', function(error, auctionCount, fields) {
                        if (error) {
                            return connection.rollback(function() {
                                res.send({ failure: "Transaction failed." });
                            });
                        } else {
                            const auctionSlot = {
                                Slot_ID: auctionSlotCount[0].count + 10,
                                Slot_Status: 'On going',
                                Publisher_ID: req.body.publisherId,
                                Auction_ID: null,
                                Start_Bid_Price: req.body.startBidPrice,
                                Category_ID: req.body.category,
                                Auction_Winner: null
                            };
                            
                            // add auction slot with auction_id as null because we still need to add auction
                            
                            connection.query('INSERT INTO `AuctionSlot` SET ?', auctionSlot, function(error, insertAuctionSlotResult, fields) {
                                if (error) {
                                    return connection.rollback(function() {
                                        res.send({ failure: "Insertion into auction slot failed." });
                                    });
                                } else {
                                    let date = `${req.body.endYear}-${req.body.endMonth}-${req.body.endDay}`;
                                    
                                    // check to see if date for end of auction slot is a valid date and a date that
                                    // is either today or in the future
                                    
                                    if (!moment(date, "YYYY-MM-DD").isValid()) {
                                        return connection.rollback(function() {
                                            res.send({ failure: "Not a proper date." });
                                        });
                                    } else {
                                        let now = moment().startOf('day').format("YYYY-MM-DD");
                                        
                                        if (!moment(date).isSameOrAfter(now, 'day')) {
                                            return connection.rollback(function() {
                                                res.send({ failure: "Date is in the past." });
                                            });
                                        } else {
                                            const auction = {
                                                Auction_ID: auctionCount[0].count + 101,
                                                Slot_ID: auctionSlotCount[0].count + 10,
                                                End_Date: date
                                            };
                                            
                                            // add auction
                                            
                                            connection.query('INSERT INTO `Auction` SET ?', auction, function(error, insertAuctionResults, fields) {
                                                if (error) {
                                                    return connection.rollback(function() {
                                                        res.send({ failure: "Insert auction failed." });
                                                    });
                                                } else {
                                                    
                                                    // update auction_id for the auction slot added above to the 
                                                    // auction_id of the auction just added
                                                    connection.query('UPDATE `AuctionSlot` SET `Auction_ID` = ? WHERE `Slot_ID` = ?', [auctionCount[0].count + 101, auctionSlotCount[0].count + 10], function(error, updateResults, fields) {
                                                        if (error) {
                                                            return connection.rollback(function() {
                                                                res.send({ failure: "Update auction slot failed." });
                                                            });
                                                        } else {
                                                            connection.commit(function(err) {
                                                                if (err) {
                                                                    return connection.rollback(function() {
                                                                        res.send({ failure: "Commit failed." });
                                                                    });
                                                                } else {
                                                                    res.send({ success: "You've successfully added an auction slot!" });   
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }        
                                }
                            });
                        }
                    });
                }
            });
        });
    });
};

