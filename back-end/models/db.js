const mongoose = require('mongoose');

var user = "matchit";
var password = "azerty12345";
var port = 49676;
var bddname = "matchit";


// useNewUrlParser ;)
var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
  };

mongoose.connect('mongodb://'+user+':'+password+'@ds149676.mlab.com:'+port+'/'+bddname,
    options,
    function(err) {
     if (err) {
       console.log(err);
     } else {
       console.info('connexion ok');
     }
    }
);

module.exports = mongoose;
