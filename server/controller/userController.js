const User = require("../models/userModels.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userCheck = require('../helper/userCheck');

// REGISTER
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "please enter required fields!" });
    }

    const isUserExist = await userCheck(email);
    
    if (isUserExist) {
      return res.status(400).json({ errorMessage: "User already exists." })
    }
    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save user to the database
    const newUser = new User({
      firstName: firstName, lastName : lastName, email: email, password: passwordHash, role: role
    })

    const savedUser = await newUser.save();

    // logged the user in
    const token = jwt.sign({ user: savedUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    // send the token in http-only cookie 
    res.cookie("token", token, {
      httpOnly: true, secure: true,
      sameSite: "none"
    })
    return res.status(200).send({message: 'success'})

  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

// lOGIN
const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400)
        .json({ errorMessage: "please enter required fields!" });
    }
    //  check user
    const existingUser = await userCheck(email);

    if (!existingUser) {
      return res.status(401)
        .json({ errorMessage: "Wrong email or password." });
    }

    // check password
    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) {
      return res.status(401)
        .json({ errorMessage: "Wrong email or password." });
    }

    // logged the user in
    const token = jwt.sign({ user: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    // send the toek in http-only cookie 
    res.cookie("token", token, {
      httpOnly: true, secure: true,
      sameSite: "none"
    })

    return res.status(200).send({message: 'success'})

  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

};

// LOGOUT 
const signout = async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = {
  signup,
  signin,
  signout
}