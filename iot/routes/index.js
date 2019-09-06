var express = require('express');
var db = require('../models/');
var router = express.Router();

var setting;

router.get("/", function(req, res){
   db.Settings.findOne()
   .then( function(result){
      console.log("Settings have been found");
      setting = result;
       return db.Stats.findOne()
   })
   .then( function(statResult){
      var timeInHot = (statResult.timeInHot / statResult.timeTotal);
      var timeInCold = (statResult.timeInCold / statResult.timeTotal);
      var timeInHumid = (statResult.timeInHumid / statResult.timeTotal);
      var timeInDry = (statResult.timeInDry / statResult.timeTotal);
      var timeOn = (statResult.timeOn / statResult.timeTotal);
      
      var stats = {
         avgTemperature: statResult.avgTemperature.toFixed(2),
         avgHumidity: statResult.avgHumidity.toFixed(2),
         avgBrightness: statResult.avgBrightness,
         temperatureData: [timeInHot, 1 - timeInHot - timeInCold, timeInCold],
         humidityData: [timeInHumid, 1 - timeInHumid - timeInDry, timeInDry],
         timeData: [timeOn, 1 - timeOn]
      };
      res.render("home", {settings : setting, stats: stats});
   })
   .catch(function(err){
      res.send(err);
   });
  
});

router.get("/details", function(req, res){
   db.Data.find().limit(24).sort({timestamp: -1})
   .then( function(data){
      var times = [];
      var temperatures = [];
      var humidities = [];
      var brightnesses = [];
      
      data.forEach(function(reading){
         times.push("'" + reading.timestamp + "'");
         temperatures.push(reading.temperature);
         humidities.push( reading.humidity);
         brightnesses.push(reading.brightness);
      });
      
   res.render("details", {data:data,
      temperature: temperatures.reverse(),
      humidity: humidities.reverse(),
      brightness: brightnesses.reverse(),
      times: times.reverse()
   });    
   })
   .catch(function(err){
      res.send(err);
   });
   
});

router.post("/set-color", function(req,res){
   console.log(req.body.color);
   console.log(req.body.options);
   
   db.Settings.findOne({})
   .then( function(result) {
       var setting = {
      "lightColor" : req.body.color,
      "lightIsOn" : true
      }
      
   if(req.body.options){
      if(req.body.options.setAsDefault){
         setting['defaultColor'] = req.body.color;
         } else if (req.body.options.changeToDefault){
         setting['lightColor'] = result['defaultColor'];
         } else if (req.body.options.turnOff || req.body.color == '000000'){
         setting['lightColor'] = '000000';
         setting['lightIsOn'] = false;
         }
      }
      return db.Settings.findOneAndUpdate({}, setting, {'new' : true, upsert : true})
   })
   .then( function(edited){
      console.log(edited);
      res.redirect("/");
   })
   .catch( function(err){
      res.send(err);
   });
});

router.post('/configure', function(req,res){
   db.Settings.findOneAndUpdate({}, req.body.setting, {'new':true, upsert:true})
   .then( function(edited){
      console.log(edited);
      res.redirect("/");
   })
   .catch( function(err){
      res.send(err);
   });
});

//comment here
router.get('/seed/:temp/:hum/:bright', function(req, res){
   var seed = {
      temperature: req.params.temp,
      humidity: req.params.hum,
      brightness: req.params.bright
   }
   
   db.Data.create(seed)
   .then(function(data){
      res.render('details', {data:data});
   })
   .catch(function(err){
      res.send(err);
   })
})

router.get('/seedStats', function(req,res){
   var seed = {
      avgTemperature:32,
      avgHumidity: 11,
      avgBrightness: 721,
      timeInHot: 20,
      timeInCold: 70,
      timeInDry: 80,
      timeInHumid: 8,
      timeOn: 59,
      timeTotal: 100
   };
   db.Stats.findOneAndUpdate({}, seed, {returnOriginal : true, upsert:true})
   .then(function(stats){
      console.log(stats);
      res.redirect('/');
   })
   .catch(function(err){
      res.send(err);
   });
});
//comment here

module.exports = router;