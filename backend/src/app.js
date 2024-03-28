const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DBURL = process.env.COMMONDBURL;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(routes)

mongoose
  .connect(DBURL)
  .then((result) =>
    app.listen(PORT, () => console.log(`Server listen at ${PORT}`))
  )
  .catch((err) => console.log(err));
