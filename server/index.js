const express = require("express");
const connect = require("./helpers/databaseConfig");
const routes = require("./routes/routes");
const adminRoutes = require("./routes/admin.routes")
const registerRoutes = require("./routes/registration.routes")
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// database connect
connect();

//middleware

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(cors());

//routes
app.use("/api", routes);
app.use("/admin", adminRoutes)
app.use("/register",registerRoutes)

app.listen(3000, () => {
  console.log(`Server is Live on http://localhost:${PORT}`);
});
