'use strict';
const uuid = require('uuid/v1');
class Record  {
    constructor(data){
        this.barcode = data[0];
        this.antibiotic = data[1];
        this.site = data[2];
        this.species = data[3];
        this.sex = data[4];
        this.age = data[4];
        this.inout = data[5];
        this.recommended = data[6];
        this.resistance = data[7];
    }
}
module.exports = Record;