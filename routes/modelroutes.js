var Contact = require('../models/contactdb');
 
module.exports = {
  configure: function(app) {
    app.get('/contacts/', function(req, res) {
      Contact.getcontactDetails(res);
    });
 
    app.post('/contacts/', function(req, res) {
      Contact.createnewContact(req.body, res);
    });
 
    app.put('/contacts/', function(req, res) {
      Contact.updateoldContact(req.body, res);
    });
 
    app.delete('/contacts/:contact_id/', function(req, res) {
      Contact.deleteContact(req.params.contact_id, res);
    });
  }
};