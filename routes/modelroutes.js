//include functionalities from contactdb.js
var Contact = require('../models/contactdb');
 
module.exports = {
  configure: function(app) {
    /*  routing for get all contacts*/
    app.get('/contacts/', function(req, res) {
      Contact.getcontactDetails(res);
    });
 
 /* routing for create new contact */
    app.post('/contacts/', function(req, res) {
      Contact.createnewContact(req.body, res);
    });
 /* routing for update a contact */
    app.put('/contacts/', function(req, res) {
      Contact.updateoldContact(req.body, res);
    });
 /* routing for delete a contact */
    app.delete('/contacts/:contact_id/', function(req, res) {
      Contact.deleteContact(req.params.contact_id, res);
    });
  }
};