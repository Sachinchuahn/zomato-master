import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
const Router = express.Router();

import { UserModel } from "../../database/user";
import { ValidateSignup } from "../../validation/auth";


Router.post("/signup",async(req,res)=> {
  try{
    await ValidateSignup(req.body.credentials);
    const {email , phoneNumber} = req.body.credentials;
     await UserModel.findEmailAndPhone(req.body.credentials);
    //const doesUserExist = await UserModel.findEmailAndPhone(
      
    //const{email,PhoneNumber} = req.body.credentials;
    //const{email,password,fullname,phoneNumber}=req.body.credentials;
    /*  const checkUserByEmail =await UserModel.findOne({email});
    const checkUserByPhone =await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhone){
      return res.json({error:"user already existe"})
    }  
    */
   // await UserModel.findEmailAndPhone(req.body.credentials);
  // await UserModel.findEmailAndPhone(email,phoneNumber);

    //hashing 
   // const bcryptSalt = await bcrypt.genSalt(8);
    //const hashedPassword = await bcrypt.hash(password,bcryptSalt);
   
    //await UserModel.create({...req.body.credentials});
     const newUser = await UserModel.create(req.body.credentials);

    //db
    //await UserModel.create({
      //...req.body.credentials,
      //password:hashedPassword
    //});

    //jwt auth token 
    //const token = jwt.sign({user:{fullname,email}},"Zomato-master");
    const token =newUser.generateJwtToken()
    return res.status(200).json({token});


  }catch (error){
    return res.status(500).json({error:error.message});
  }
});



//Models


//Validation
//import { ValidateSignup, ValidateSignin } from "../../validation/auth";

/*
Route         /signup
Descrip       Signup with email and password
Params        None
Access        Public
Method        POST

/*
Router.post("/signup", async(req,res) => {
  try {
await ValidateSignup(req.body.credentials);

await UserModel.findEmailAndPhone(req.body.credentials);
//DB
   const newUser = await UserModel.create(req.body.credentials);

   //JWT Auth Token
   const token = newUser.generateJwtToken();

   return res.status(200).json({token});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});


/*
Route         /signin
Descrip       Signin with email and password
Params        None
Access        Public
Method        POST
*/

Router.post("/signin", async(req,res) => {
  try {
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(
      req.body.credentials
    );

   //JWT Auth Token
   const token = user.generateJwtToken();

   return res.status(200).json({token, status: "Success"});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});




Router.get("/google", passport.authenticate("google",{
scope: [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
],
})
);

/*
Route         /google/callback
Descrip       Google Signin callback
Params        None
Access        Public
Method        GET
*/

Router.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}),
(req,res) => {
  return res.json({token: req.session.passport.user.token});



});


export default Router;