const path = require("path");
const rfs = require("rotating-file-stream");

const LogStream = rfs.createStream("access.log", {
  interval: "7d", // rotate daily
  path: path.join(__dirname, "../logs"),
});

module.exports = {
  skip: (req, res) => res.statusCode < 400,
  stream: LogStream,
};
