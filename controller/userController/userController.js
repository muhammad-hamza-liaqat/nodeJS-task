const { userModel, validateUser } = require("../../models/userModel/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");



const userSignUp = async (req, res) => {
    const userData = req.body;
    console.log(userData)
    const validationResult = validateUser(userData);
  
    if (validationResult.error) {
      return res.status(400).json({
        message: "Validation error",
        error: validationResult.error.message,
      });
    }
  
    try {
      // Checking if the user already exists
      const checkUser = await userModel.findOne({ email: userModel.email });
  
      if (checkUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // New user creation
      const randomPassword = uuidv4();
      const hashedRandomPassword = await bcrypt.hash(randomPassword, 10);
  
      // Creating a new user with spread operator and hashed password
      const newUser = await userModel.create({
        ...req.body,
        password: hashedRandomPassword,
      });
  
      console.log("User created", newUser);
  
      return res.status(201).json({
        message: "User created successfully!",
        user: newUser,
      });
    } catch (error) {
      console.log("Internal Server Error", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email required" });
  }
  if (!password) {
    return res.status(400).json({ message: "password required" });
  }
  try {
    const userToFind = await User.findOne({email:email})
    if (!userToFind){
        return res.status(400).json({message: "user not found"})
    }

    
  } catch (error) {
    console.log("internal server error- userSignIn",error);
    return res.status(500).json({message: "internal server error", error: error.message})
  }
};

module.exports = { userSignUp, userSignIn };
