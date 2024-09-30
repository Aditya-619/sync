const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
