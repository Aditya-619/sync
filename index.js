const express = require("express");
const validateInput = require("./validations");
const jwt = require("jsonwebtoken");
const jwtPassword = '123456'
const app = express();


app.use(express.json());



// app.use((err, req, res, next) => {
//   res.status(500).send("Something went wrong");
// })

const allUsers = [
  {
    username: 'John@gmail.com',
    password: '1234',
    name: 'John Doe'
  },
  {
    username: 'Jane@gmail.com',
    password: '5678',
    name: 'Jane Doe'
  },
  {
    username: 'Alice@gmail.com',
    password: '34567',
    name: 'Alice Wu'
  },
]

const userExists = (username, password) => {
  let exists = false;
  for(let i=0; i<allUsers.length; i++) {
    if(allUsers[i].username == username && allUsers[i].password == password) {
      exists = true;
    }
  }
  return exists;
}

app.post('/signup', (req, res) => {
  try {

    const { username, password } = req.body;
    if(!userExists(username, password)) {
      res.status(404).json({msg: 'user not found'});
      return;
    }
    const token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
      token,
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'something went wrong',
    });
  }
});

app.get('/users', (req, res) => {
  try {

    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, jwtPassword);
    // console.log('check---------------------------', decoded)
    // const username = decoded.username;
    // console.log('decode username', username);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        msg: 'Authorization header missing or incorrectly formatted'
      });
    }
    
    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, jwtPassword);

    const username = decoded.username;
    console.log('Decoded username:', username);

    res.json({
      users: allUsers,
    })
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Invalid token'
    });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});