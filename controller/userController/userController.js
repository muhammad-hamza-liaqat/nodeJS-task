const { User, validateUser} = require("../../models/userModel/userModel")

const userSignUp = async(req,res)=>{
    // res.end("hello")
    const userData = req.body;
    const validationResult = validateUser(userData);

    if (validationResult.error){
        return res.status(400).json({message: "validation error", error: validationResult.error.message})
    }
    try{
        // checking if the user exists already or not
        const checkUser = await User.findOne({email: userData.email})
        if (checkUser){
            return res.status(400).json({message: "user already exists"})
        }
        const newUser = await User.create(userData);
        console.log("userCreated", newUser);
        return res.status(201).json({message: "user created successfully!", user:newUser})



    } catch(error){
        console.log("Internal Server Error", error);
        return res.status(500).json({message: "internal server error", error: error})
    }

}

module.exports ={ userSignUp}