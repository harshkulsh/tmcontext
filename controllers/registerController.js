const path=require("path");
const bcrypt=require("bcrypt");    //used to apply hashing on password
const alert=require("alert");   //used to receive data from html pages
const jwt=require("jsonwebtoken");
const User=require("../model/user");        //used for storing usernames and passwords  

const register=async (req, res) => {
    // Our register logic starts here
    try {
      // Get user input
      const {username, password } = req.body;
      // Validate user input
      if (!(username && password)) {
        return alert("Enter both username and password");
      }
      if(username.length<5) {
        return alert("Username should be more than 5 characters");
        //return res.status(400).send("Username should be more than 5 characters");
      }
      if(password.length<8) {
        return alert("Password length should be more than 8");
        //return res.status(400).send("Password length should be more than 8");
      }
      
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ username});
  
      if (oldUser) {
        return alert("Username already exists,select a different name");
      }
  
      //Encrypt user password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword =await bcrypt.hash(password, salt);
  
      // Create user in our database
      const user = await User.create({
        username: username, 
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "90d",
        }
      );
      // save user token
      user.token = token;
      user.save();
      const mainpath=path.join(__dirname,"../");
      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }


const registerView= async(req, res) => {
    const mainpath=path.join(__dirname,"../");
    await res.sendFile(mainpath+"/view/register.html");
}

module.exports={
register,
registerView,
}