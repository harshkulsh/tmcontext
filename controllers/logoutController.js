const path=require("path");

const logout=(req, res) => {
    const mainpath=path.join(__dirname,"../");
    res.sendFile(mainpath+"/view/register.html");
}

module.exports=logout;