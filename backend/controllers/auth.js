const User = require("../models/User");
const createError = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const register = async (req,res,next) => {
  try {
    const userNameExist = await User.findOne({username:req.body.username});
    if (userNameExist) {
      return next(createError(410, "Username already taken, try again"))
    }
    const emailExist = await User.findOne({email:req.body.email});
    if (emailExist) {
      return next(createError(411, "Email already in use, try again"))
    }
  
    // if (!validator.isStrongPassword(isPasswordStrong,[{minLength:6}])) {
    //    return next(createError(412,'Password not strong enough'))
    // }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username:req.body.username,
      email:req.body.email,
      password:hash,
    })
    await newUser.save();
    res.status(200).send("User has been created.")
  } catch(err) {
    next(err);
  }
}

const login = async (req,res,next) => {
  try {
    const user = await User.findOne({username:req.body.username});
    if(!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) 
      return next(createError(400, "Incorrect Username or Password!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
    .cookie("access_token", token, {httpOnly: true})
    .status(200)
    .json({...otherDetails} );
  } catch(err) {
    next(err);
  }
}


module.exports = { register, login };