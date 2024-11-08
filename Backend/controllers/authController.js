const User=require("../models/usermodel")
const bcrypt = require("bcrypt");

const login=async (req,res)=>{
    const{email,password}=req.body

    try{
        const user=await User.findOne({email})
        if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    console.log("pasword is",isPasswordValid);
    if(!isPasswordValid){
         return res.status(401).json({ message: "Invalid credentials" });
    }
       res.status(200).json({ message: "Login successful" });
}
    catch(error){
          res.status(500).json({ message: "Server error", error });

    }
}

const signUp=async (req,res)=>{
    const{email,password}=req.body
    const hashPassword=await bcrypt.hash(password,10)

   try {
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: "User already exists." });
     }
     const user = await User.create({ email, password: hashPassword });
     res.status(201).json({ message: "Signup successful", userId: user._id });
   } catch (error) {
     res.status(500).json({ message: "Server error", error });
   }

}

module.exports = {login,signUp}

