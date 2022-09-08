const User = require('../models/userModels')

const roleCheck = async (req, res, next) => {
    try {
       const existingUser = await User.findById(req.user);
       if(!existingUser) res.status(404).json({ errorMessage: "User does not exists"});

        if(existingUser.role !== 'admin') res.status(401).json({ errorMessage: "Unauthorised"});
        next();
    } catch (err) {
        res.status(401).json({ errorMessage: "Unauthorized"});
    }
}

module.exports = roleCheck;