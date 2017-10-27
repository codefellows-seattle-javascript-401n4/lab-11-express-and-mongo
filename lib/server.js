'use strict';


let server;

module.exports = {
  start: (app, port) => {
    return new Promise( (resolve) => {
      server = app.listen(port, () => {
        resolve(`server started on port ${port}`);
      });
    });
  },
  stop: () => {
    return new Promise( (resolve,reject) => {
      if (server.listening) {
        server.close();
      }
      if (!server.listening) {
        resolve('server stopped');
      } else {
        reject('server is still running for some reason');
      }
    });
  },
};
