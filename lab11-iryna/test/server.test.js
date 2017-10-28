'use strict';

const superagent = require('superagent');

const server = require('../lib/server');

process.env.PORT = 5000;

let idGet;

beforeAll(() => {
    return  server.listen(process.env.PORT);
    // records.remove({});
})
afterAll(() => {
    server.close();
})

test('POST should create a record', () => {
    return superagent
    .post(`localhost:${process.env.PORT}/api/records`)
    .set({"Content-Type":"application/json"})
    .send({"barcode":"771", "antibiotic":"Amoxicillin","site":"Kaiser","species":"E. coli", "sex":"Any", "age":"0 to 3", "inout":"In-patient", "recommended":"no", "resistance":"40"})
    .then((res) => {
        expect(res.body.barcode).toEqual("771");
        expect(res.body.site).toEqual("Kaiser");
        idGet = res.body._id;
    });
})

test('GET should return a single record provided an id', ()=>{
    return superagent
    .get(`localhost:${process.env.PORT}/api/records?id=${idGet}`)
    .then((res)=>{
        expect(res.body.barcode).toEqual("771");
        expect(res.body.site).toEqual("Kaiser");
    })
})
