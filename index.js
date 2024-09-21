const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateInput = require("./validations");
const { config } = require("dotenv");

const UserModel = require("./model/user.js");

const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
}

// app.use((err, req, res, next) => {
//   res.status(500).send("Something went wrong");
// })

const allUsers = [
  {
    username: "John@gmail.com",
    password: "1234",
    name: "John Doe",
  },
  {
    username: "Jane@gmail.com",
    password: "5678",
    name: "Jane Doe",
  },
  {
    username: "Alice@gmail.com",
    password: "34567",
    name: "Alice Wu",
  },
];

app.use(express.json());

const userExists = (username, password) => {
  let exists = false;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].username == username && allUsers[i].password == password) {
      exists = true;
    }
  }
  return exists;
};

app.post("/signup", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const isUserExist = await UserModel.findOne({ username });
    if (isUserExist) {
      res.status(404).json({
        status: 0,
        msg: "user already exists",
      });
      return;
    }
    const user = new UserModel({
      name: name,
      username: username,
      password: password,
    });
    user.save();

    const token = jwt.sign(
      {
        username: username,
        password: password,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      status: 0,
      token,
      msg: "user created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, jwtPassword);
    // console.log('check---------------------------', decoded)
    // const username = decoded.username;
    // console.log('decode username', username);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Authorization header missing or incorrectly formatted",
      });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const username = decoded.username;
    const password = decoded.password;
    console.log("Decoded username:", username);
    console.log("Decoded password:", password);

    const users = await UserModel.find();

    res.json({
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Invalid token",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
