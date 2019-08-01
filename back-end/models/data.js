const mongoose = require('mongoose');


// Here, we just need to define a movie schema
const dataSchema = mongoose.Schema({
    cpuUsage: Number,
    memory: Number,
    netIn: Number,
    netOut: Number,
    currentHeight : Number
  });

// And then, we need to create a model which will create a new 'datas' collection in mlab base on the data schema
const dataModel = mongoose.model('datas', dataSchema);

// dataModel.create({
//   cpuUsage : 0.850681543 ,
//   memory : 13876,
//   netIn :0 ,
//   netOut : 0
// }, function(error, data){
//   if(error){
//     console.log('Probleme ajouts donnée dans la collection')
//     console.log(error)
//   }else{
//     console.log('Ajout 100% de la donnée');
//     console.log(data);
  
//   }
// })

module.exports = dataModel;
