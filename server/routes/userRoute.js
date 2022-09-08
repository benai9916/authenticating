const express = require("express");
const { signup, signin, signout } =  require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/signout", signout);

module.exports = userRouter;