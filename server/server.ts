import express from "express";
import bodyParser from "body-parser"
import config from "./source/config/config";
import { Schema } from "mongoose";
import {Request, Response} from "express";
const mongoose=require('mongoose');
require("./db/connection");
const Register_model=require("./models/RegistrationSchema");
import  * as controller from "./controller/controller";   
const app=express();
app.use(express.json());


app.post("/registerdoner",controller.registerdoner)

app.get("/getdoners",controller.Getdoners);

app.post("/senddata",controller.Getsearchdata)

app.post("/editdonor",controller.EditDonor);

app.listen(5000,()=>{
    console.log(`Server is running at:5000`);
})