const express = require("express");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const path = require("path");

const employeeRouter = require("./routes/employee");
app.use("/employee", employeeRouter);

const absenceRouter = require("./routes/absence");
app.use("/absence", absenceRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// const cartRouter = require("./routes/cart");
// app.use("/cart", cartRouter);

const db = require("./models/index");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("success");
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log("This server is running ... ");
    });
  })
  .catch((error) => {
    console.log(error);
  });
