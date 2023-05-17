import { db } from "./dbConnect.js";

const coll = db.collection('users');


export const addUser = async (req, res) => {
   const {email, password} = req.body;
   if(!email ||  password.length <3) {
    res.status(400).send({ message: "Email and password required and must be greater than 3."})
    return 
   }
   const newUser = {
    email: email.toLowerCase(),
    password,
    createdAt: new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
   }
   await coll.insertOne(newUser);
   res.status(201).send({message: "Registered"})

}


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const _email = email.toLowerCase();
  const user = await coll.findOne({email: _email, password: password});

  if(user.length < 1) {
    res.status(403).send({message: "Invalid username or password", success: false})
  }
  delete user.password
  res.send(user);

}



