const registerRouter = require("./routes/Register");
const loginRouter = require("./routes/login");
const flightRouter = require("./routes/flight");
const cityRouter = require("./routes/city");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
// app.use('/', (req, res) => {
//     res.json({ data: 'Hello World!' })
// })

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/flights", flightRouter);
app.use("/cities", cityRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// const staffRouter = require("./routes/Staff");
// app.use("/staff", staffRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("\n\nServer running on port " + port + "\n\n");
});
