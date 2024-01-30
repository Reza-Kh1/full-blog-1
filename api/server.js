import http from "http";
import app from "./app.js";
const server = http.createServer(app);
server.listen(5000, "localhost", () => {
  console.log("server is run");
});
