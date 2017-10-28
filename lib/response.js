'use strict';


module.exports = {


  status: (res, status, text) => {

    res.writeHead(status);
    res.write(text);
    res.end();

  },

  json: (res, status, data) => {

    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));

  },


};

// let sendStatus = (res, status, text) => { 
//     res.writeHead(status);
//     res.write(text);
//     res.end();
//   };
  
//   let sendJSON = (res, status, data) => {
//     res.writeHead(status, {
//       'Content-Type' : 'application/json'
//     });
//     res.end(JSON.stringify(data));
//     // console.log(data);
//   };