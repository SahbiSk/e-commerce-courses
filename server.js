const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { sendError } = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

const DB = process.env.DATABASE;
const port = process.env.PORT || 5000;

const app = express();

app.enable("trust proxy");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stripe", stripeRoutes);

app.use((err, req, res, next) => sendError(err, res));

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected to db`))
  .catch((e) => console.log(e));

app.listen(port, () => console.log(`server is running on port ${port}`));
