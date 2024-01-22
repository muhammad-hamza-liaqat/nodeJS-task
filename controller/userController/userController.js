const { userModel, validateUser } = require("../../models/userModel/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { newEmailQueue } = require("../../utils/nodeMailer/nodeMailer");

const userSignUp = async (req, res) => {
  const userData = req.body;
  // console.log(userData)
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
    console.log("randomPassword", randomPassword);
    console.log("hashedRandomPassword", hashedRandomPassword);
    // Creating a new user with spread operator and hashed password
    const newUser = await userModel.create({
      ...req.body,
      password: hashedRandomPassword,
    });

    console.log("User created", newUser);
    const welcomeUserContent = `
      <html>
        <head>
          <title>Welcome ${newUser.email}</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
    
          <div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333;">Welcome to Our Community!</h2>
            <h3 style="color: #333;">${newUser.email}</h3>
            <p>We are excited to have you as a member of our community. Thank you for joining us!</p>
            <p>your password to login into the web application is ${randomPassword}</p>
            <a href="http://localhost:3000/api/user/login" target="_blank" style="text-decoration: none;">
              <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                Sign In
              </button>
            </a>
          </div>
        </body>
      </html>
    `;

    await newEmailQueue.add({
      to: newUser.email,
      subject: "Welcome to samaritan",
      text: "Hello samaritan family, For the one-time sign-up, your password is as follows",
      html: welcomeUserContent,
    });

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
  console.log("Received request with email:", email);

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }

  try {
    const userToFind = await userModel.findOne({ email: email });

    if (!userToFind) {
      console.log("User not found with email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validatePassword = await bcrypt.compare(
      password,
      userToFind.password
    );

    if (!validatePassword) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User login successful for email:", email);
    return res.status(200).json({ message: "User login", user: userToFind });
  } catch (error) {
    console.log("Internal server error - userSignIn", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports = { userSignUp, userSignIn };
