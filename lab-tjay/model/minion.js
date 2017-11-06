'use strict';

const mongoose = require('mongoose');

const minionSchema = mongoose.Schema({
  jobTitle: {type:String, required: true},
  minionRank: {type:String, required: true},
  minionAge: {type:Number},
});

module.exports = mongoose.model('minion', minionSchema);
