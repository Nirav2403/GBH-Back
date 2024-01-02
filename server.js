const app = require("./app");
const config = require("./config/appConfig");
const connectDB = require("./config/database");

const PORT = config.app.port;

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on port ${PORT}`);
});
