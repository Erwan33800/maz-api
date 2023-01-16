require("dotenv").config();
const app = require("express")();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3008;
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/usersRoutes");
const mailsRoutes = require("./routes/mailsRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(authRoutes);
app.use(usersRoutes);
app.use(mailsRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
