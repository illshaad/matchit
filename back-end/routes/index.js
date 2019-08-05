const express = require("express");
const router = express.Router();
const request = require("request");
const dataModel = require("../models/data");
const api_url = "http://15.188.3.166:8080/status";

//RECUPERATION DONNEE VERS API //

router.get("/first", function(req, res, next) {
  request(api_url, function(err, response, body) {
    body = JSON.parse(body);
    console.log(body, "Mes donnés reçu");
    res.json(body);
  });
});


// ROUTE POSTE TRAITEMENT SAUVEGARDER LA DONNEE //
router.post("/save", function(req, res, next) {
  console.log("test", req.body.data);
  var newData = new dataModel({
    cpuUsage: req.body.data.bot.cpuUsage,
    memory: req.body.data.bot.memory,
    netIn: req.body.data.bot.netIn,
    netOut: req.body.data.bot.netOut,
    currentHeight: req.body.data.blockchain.currentHeight
  });

  //Sauvegarde ma donnée sur Mlab//
  console.log("saveeee");
  newData.save(function(error, data) {
    res.json({ result: true, data });
  });
});

module.exports = router;