const express = require('express');
const router = express.Router();
const request = require('request');
const dataModel = require('../models/data');

//RECUPERATION DONNEE//

const api_url = 'http://15.188.3.166:8080/status';



router.get('/first', function(req, res, next) {
  request(api_url,function(err,response,body){
    body = JSON.parse(body);
    console.log(body , 'STEPPPPPP111')
  })
   res.json({result : true });
  });

  router.get('/save', function(req, res, next){
    dataModel.find(function(error , data){
      res.json({result : true , data})
    })
  })

  router.post('/save', function(req, res, next) {
    var newData = new dataModel({
    cpuUsage: req.body.cpuUsage,
    memory: req.body.memory,
    netIn: req.body.netIn,
    netOut: req.body.netOut,
    currentHeight : req.body.currentHeight
    })
    newData.save(function(error,data){
      res.json({result : true , data})
    })
  })
  

  
// setInterval(function() {
  //   router.get('/', function(req, res, next) {
  //     request(api_url,function(err,response,body){
  //       body = JSON.parse(body);
  //       console.log(body , 'STEPPPPPP111')
  //     })
  //      res.json({result : true });
  //     });
  //  },3000)

 // CREATION UNE NOUVELLE ROUTE POST POUR SAUVEGARDER DANS MON MLAB 

 




 



module.exports = router;
