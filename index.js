const PORT = process.env.PORT || 3000;
const app = require('./lib/routes.js');

app.listen(PORT, () => {
  console.log(`Server is live on port: ${PORT}`);
});