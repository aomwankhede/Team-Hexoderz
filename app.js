const express = require("express")
const path = require("path")
const ejs = require("ejs");
const mode = require("./src/Models/schema");
const app = express();
require("./src/DB/conn")
const port = process.env.PORT||8000;

const staticpath = path.join(__dirname, "../public") 

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.use(express.static(staticpath));
app.set("view engine" ,"ejs");

app.get("/" ,(req,res)=>{
    res.render("home")
    res.send("Welcome to the homepage")
})

app.get("/login" ,(req,res)=>{
    res.render("login")
    res.send("Welcome to the homepage")
})
app.post("/login",async(req,res)=>{
      try{
        const checkuser = req.body.uname;
        const checkpass = req.body.psw;

        const usercheck = await mode.findOne({username:checkuser});

        if(usercheck.password == checkpass){
          res.redirect(`/login/${usercheck.id}/cryptotool`)
        }
        else{
          console.log("Invalid details");
        }
      }catch(error){
        res.send("Error")
      }
});

app.get("/login/:id/cryptotool",(req,res) =>{
      res.render("invtool");
} )

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.post('/signup',async(req,res)=>{
       try{
          const password=req.body.password;
          const cpassword=req.body.confirm_password;
          if(cpassword==password){
              const user_data= new mode({
                name: req.body.name,
                email: req.body.email,
                username:req.body.username,
                password:req.body.password,
                confirmpassword:req.body.confirm_password,
              })
              const registered = await user_data.save();
              res.status(202).redirect("/login");
            }
       }catch(error){
              console.log("Submission failed")
       }
})

app.get("/cryptoscanner",(req,res)=>{
    res.render("scanner");
})

app.get("/aboutus"),(req,res)=>{
    res.send("This is the about page")
}

  app.listen(port,()=>{
      console.log("Listening to port 8000");
  })