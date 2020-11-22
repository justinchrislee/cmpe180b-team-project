const bcrypt = require('bcryptjs');

module.exports = (app, connection) => {
    app.post('/api/adsignup', async (req, res) => { 
        connection.query('SELECT * FROM `User` WHERE `Email` = ?', [req.body.email], function(error, emailResults, fields) {
            if (error) {
                res.send({ failure: "Error occurred while querying for email."})
            } else {
                if (emailResults.length > 0) {
                    res.send({ failure: "An advertiser has already registered with this email." });
                } else {
                    connection.query('SELECT * FROM `Advertiser` WHERE `Advertiser_Name` = ?', [req.body.advertiserName], function(error, advertiserResults, fields) {
                        if (advertiserResults.length > 0) {
                            res.send({ failure: "Advertiser name already exists. Must pick another name."});
                        } else {
                            connection.query('SELECT COUNT(*) AS count FROM `USER`', function(error, userRows, fields) {
                                if (error) {
                                    res.send({ failure: "Error occurred while trying to generate user ID." });
                                } else {
                                    bcrypt.genSalt(10, function(err, salt) {
                                         bcrypt.hash(req.body.password, salt, function(err, hash) {
                                              if (err) {
                                                  res.send({ failure: "Error trying to hash password." });
                                              } else {
                                                  const user = { User_ID: userRows[0].count + 1000, First_Name: req.body.firstName, Last_Name: req.body.lastName, Email: req.body.email, User_Password: hash }

                                                  connection.query('INSERT INTO `User` SET ?', user, function(error, results, fields) {
                                                      if (error) {
                                                          res.send({ failure: "Error trying to add user to database."});
                                                      } else {
                                                          const advertiser = { Advertiser_ID: userRows[0].count + 1000, Advertiser_Name: req.body.advertiserName, Ad_Description: req.body.adCreativeDescription, BudgetedCost: req.body.adBudget };

                                                          connection.query('INSERT INTO `Advertiser` SET ?', advertiser, function(error, results, fields) {
                                                              if (error) {
                                                                  console.log(error);
                                                                  res.send({ failure: "Error trying to add advertiser to database."});
                                                              } else {
                                                                  res.send({ success: "You've signed up as an advertiser!" });
                                                              }
                                                          });
                                                      }
                                                  }); 
                                              }
                                            
                                         });
                                    }); // BEGIN HASH PROCESS

                                }
                            }); // GENERATE USER ID QUERY
                        }
                    });              
                }
            }
        }) // MAIN QUERY  
    });
    
    app.post('/api/pubsignup', (req, res) => {
        connection.query('SELECT * FROM `User` WHERE `Email` = ?', [req.body.email], function(error, emailResults, fields) {
            if (error) {
                res.send({ failure: "Error occurred while querying for email."});
            } else {
                if (emailResults.length > 0) {
                    res.send({ failure: "A publisher has already registered with this email." })
                } else {
                    connection.query('SELECT * FROM `Publisher` WHERE `Publisher_Name` = ?', [req.body.publisherName], function(error, publisherResults, fields) {
                        if (publisherResults.length > 0) {
                            res.send({ failure: "Publisher name already exists. Must pick another name." });
                        } else {
                            connection.query('SELECT COUNT(*) AS count FROM `USER`', function(error, userRows, fields) {
                                if (error) {
                                    res.send({ failure: "Error occurred while trying to generate user ID." });
                                } else {
                                    bcrypt.genSalt(10, function(err, salt) {
                                         bcrypt.hash(req.body.password, salt, function(err, hash) {
                                             if (err) {
                                                 res.send({ failure: "Error trying to hash password." });
                                             } else {
                                                  const user = { User_ID: userRows[0].count + 1000, First_Name: req.body.firstName, Last_Name: req.body.lastName, Email: req.body.email, User_Password: hash }

                                                  connection.query('INSERT INTO `User` SET ?', user, function(error, results, fields) {
                                                      if (error) {
                                                          res.send({ failure: "Error trying to add user to the database." });
                                                      } else {
                                                          const publisher = { Publisher_ID: userRows[0].count + 1000, Publisher_Name: req.body.publisherName };

                                                          connection.query('INSERT INTO `Publisher` SET ?', publisher, function(error, results, fields) {
                                                              if (error) {
                                                                  res.send({ failure: "Error trying to add publisher to the database." });
                                                              } else {
                                                                  res.send({ success: "You've signed up as a publisher!" });
                                                              }
                                                          });
                                                      }
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
        }) // MAIN QUERY  
    });
}







