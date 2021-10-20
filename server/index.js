require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import Auth from "./API/Auth"
import passport from "passport";
import googleAuthConfig from "./config/google.config";

import routeConfig from "./config/route.config";
 

import ConnectDB from "./database/connection"
//import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Order from "./API/orders";


//database connection




const zomato = express();



routeConfig(passport);
zomato.use(express.json());
zomato.use(express.urlencoded({extended :false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);

//zomato.use(passport.initialize());
//zomato.use(passport.session());



//googleAuthConfig(passport);

zomato.use("/auth",Auth);


zomato.get("/",(req,res) => res.json({message:"Setup Sucess Yay !!"}));
zomato.listen(4000, ()=>
ConnectDB().then(()=>console.log("Server is up and running")).catch(()=>console.log("dbconnection failed" )));
