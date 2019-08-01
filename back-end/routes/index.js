const express = require("express");
const router = express.Router();
const request = require("request");
const dataModel = require("../models/data");

//RECUPERATION DONNEE//

const api_url = "http://15.188.3.166:8080/status";

router.get("/first", function(req, res, next) {
  request(api_url, function(err, response, body) {
    body = JSON.parse(body);
    console.log(body, "STEPPPPPP111");
    res.json(body);
  });
});

// Route POSTE  //
router.post("/save", function(req, res, next) {
  console.log("test", req.body.data);
  var newData = new dataModel({
    cpuUsage: req.body.data.bot.cpuUsage,
    memory: req.body.data.bot.memory,
    netIn: req.body.data.bot.netIn,
    netOut: req.body.data.bot.netOut,
    currentHeight: req.body.data.blockchain.currentHeight
  });

  //Sauvegarder ma donnée sur Mlab //
  console.log("saveeee");
  newData.save(function(error, data) {
    res.json({ result: true, data });
  });
});

module.exports = router;