const path=require("path");
const bcrypt=require("bcrypt");    //used to apply hashing on password
const alert=require("alert");   //used to receive data from html pages
const jwt=require("jsonwebtoken");
const User=require("../model/user");        //used for storing usernames and passwords  

const login=async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { username, password } = req.body;
  
      // Validate user input
      if (!(username && password)) {
        alert("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
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
  
        // user
        const mainpath=path.join(__dirname,"../");
        return res.status(200).render(mainpath+"/view/index.ejs", {name:username});
      }
      alert("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }

const loginView=async(req, res) => {
    const mainpath=path.join(__dirname,"../");
    await res.sendFile(mainpath+"/view/login.html");
  }

module.exports={
    login,
    loginView,
}