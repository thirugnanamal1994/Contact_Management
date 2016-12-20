var Contact = require('../models/contactdb');
 
module.exports = {
  configure: function(app) {
    /* get all contacts*/
    app.get('/contacts/', function(req, res) {
      Contact.getcontactDetails(res);
    });
 
 /* create new contact */
    app.post('/contacts/', function(req, res) {
      Contact.createnewContact(req.body, res);
    });
 /* update a contact */
    app.put('/contacts/', function(req, res) {
      Contact.updateoldContact(req.body, res);
    });
 /* delete a contact */
    app.delete('/contacts/:contact_id/', function(req, res) {
      Contact.deleteContact(req.params.contact_id, res);
    });
  }
};