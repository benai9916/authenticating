const User = require("../models/userModels.js");

const userCheck = async (email) => {
   return await User.findOne({ email });
}
module.exports = userCheck