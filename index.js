// import app here and start the server. Import from routes.js, not server.js (if we can make it work like that)

const PORT = process.env.PORT || 3000;
const app = require('./lib/routes.js');

app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});