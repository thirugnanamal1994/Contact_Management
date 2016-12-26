//include functionalities of mysql (installed using npm)
var mysql = require('mysql');
 
//function for creating a pool connection(multiple connections)
function Connection() {
  this.pool = null;
 
  //initiating the connection
  this.init = function() {
    this.pool = mysql.createPool({
     //maximum number of connections provided
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: '',
   //respective database name
      database: 'contact_managment'      
    });
  };
 
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}
 //exporting module to use in other files
module.exports = new Connection();