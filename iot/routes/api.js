var express = require('express');
var router = express.Router();
var db = require('../models');
var dataHelpers = require('../helpers/data');
var statsHelpers = require('../helpers/stats');
var settingsHelpers = require('../helpers/settings');

    router.route('/data')
    .get(dataHelpers.getData)
    .post(dataHelpers.createData)
    .delete(dataHelpers.deleteData);
        
    router.route('/data/:id')
        .get(dataHelpers.getOneData)
        .put(dataHelpers.editData)
        .delete(dataHelpers.deleteOneData);
        
    router.route('/settings')
        .get(settingsHelpers.getSettings)
        .put(settingsHelpers.editSettings);
        
    router.route('/statistics')
        .get(statsHelpers.getStats)
        .put(statsHelpers.editStats)
        .delete(statsHelpers.resetStats);
        
module.exports = router;
    