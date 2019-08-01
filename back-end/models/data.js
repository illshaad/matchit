const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    cpuUsage: Number,
    memory: Number,
    netIn: Number,
    netOut: Number,
    currentHeight : Number
  });

// Création dataSchema //
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
