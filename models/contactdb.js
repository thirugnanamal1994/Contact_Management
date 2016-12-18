var connection=require("../connection");

function Contacts() {
         this.getcontactDetails = function(res) {
            connection.acquire(function(err, con) {
            con.query('select * from contact_details', function(err, result) {
                con.release();
                if(err)
                {
                    res.send({status: 1, message: 'Failed to Retrive Contacts!!!',error_info : err});    
                }
                else
                {
                    if(result.length)
                    {
                        res.send(result);
                    }
                    else
                    {
                        res.send({status: 0, message: 'Contacts are Empty!!!'});    
                    }
                }
            });
            });
        };
        //Create Contact
        this.createnewContact = function(contact, res) {
            connection.acquire(function(err, con) {
                con.query('select * from contact_details where Contact_Name=? AND Contact_Mobile_No = ?',[contact.Contact_Name,contact.Contact_Mobile_No], function(err, result) {
                    con.release();
                    if(err)
                    {
                        res.send({status: 1, message: 'Failed to Store Contacts!!!',error_info : err});    
                    }
                    else
                    {
                        if(result.length)
                        {
                            res.send({status: 0, message: 'Contact Already Exist!!!'});
                        }
                        else
                        {
                            connection.acquire(function(err, con) {
                                con.query('insert into contact_details set ?', [contact], function(err, result) {
                                    con.release();
                                    if (err) {
                                    res.send({status: 1, message: 'Failed to Store Contacts!!!', error_info : err});
                                    } else {
                                    res.send({status: 0, message: 'Contact Created Successfully'});
                                    }
                                }); 
                            });
                        }
                    }
                });   
            });
        };

        // Update Contact from database
        this.updateoldContact = function(contact, res) {
            connection.acquire(function(err, con) {
                con.query('select * from contact_details where Contact_Id= ?',contact.Contact_Id, function(err, result) {
                    con.release();
                    if(err)
                    {
                        res.send({status: 1, message: 'Failed to Update Contacts!!!',error_info : err});    
                    }
                    else
                    {
                        if(result.length)
                        {
                            connection.acquire(function(err, con) {
                                con.query('update contact_details set ? where Contact_Id = ?', [contact, contact.Contact_Id], function(err, result) {
                                    con.release();
                                    if (err) {
                                    res.send({status: 1, message: 'Failed to Update Contacts!!!',error_info : err});
                                    } else {
                                    res.send({status: 0, message: 'Contact Updated Successfully'});
                                    }
                                });
                            });
                        }
                        else
                        {
                            res.send({status: 0, message: 'Contact Does Not Exist!!!'});
                        }
                    }
                });   
            });
        };


        // Delete Contact from database
        this.deleteContact = function(contact_id, res) {
            connection.acquire(function(err, con) {
                con.query('select * from contact_details where Contact_Id= ?',contact_id, function(err, result) {
                    con.release();
                    if(err)
                    {
                        res.send({status: 1, message: 'Failed to Update Contacts!!!',error_info : err});    
                    }
                    else
                    {
                        if(result.length)
                        {
                            connection.acquire(function(err, con) {
                                con.query('delete from contact_details where Contact_Id = ?', contact_id, function(err, result) {
                                    con.release();
                                    if (err) {
                                    res.send({status: 1, message: 'Failed to Delete Contact!!!'});
                                    } else {
                                    res.send({status: 0, message: 'Contact Deleted Successfully'});
                                    }
                                });
                            });
                        }
                        else
                        {
                            res.send({status: 0, message: 'Contact Already Deleted or Does Not Exist!!!'});
                        }
                    }
                });   
            });
        };
}
module.exports = new Contacts();    
  