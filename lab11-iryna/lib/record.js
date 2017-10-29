'use strict';
const uuid = require('uuid/v1');
class Record  {
    constructor(data){
        this.barcode = data.barcode;
        this.antibiotic = data.antibiotic;
        this.site = data.site;
        this.species = data.species;
        this.sex = data.sex;
        this.age = data.age;
        this.inout = data.inout;
        this.recommended = data.recommended;
        this.resistance = data.resistance;
    }
}
module.exports = Record;