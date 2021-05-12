import {Request,Response,NextFunction, response} from "express"
import mongoose from "mongoose"
const Register_model=require("../models/RegistrationSchema");
import {validate} from "./Validate";

export const registerdoner= async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body);
    const{ first_name,last_name,age,bloodgroup,address,phoneno,distt,state,coronapositive,coronanegative,gender}=req.body;
    if(!first_name ||!age||!bloodgroup||!phoneno||!distt||!state||!coronapositive||!coronanegative)
    {
        return res.status(403).json({error:"filled all "});
    }
    req.body.state= req.body.state.toUpperCase();
    req.body.age=parseInt(req.body.age);
     req.body.distt=req.body.distt.toUpperCase();
     try{
         if(validate(first_name,age,address,phoneno,distt,state,coronapositive,coronanegative,gender)){
             console.log("validate")
            const user=await Register_model.findOne({phoneno:phoneno});
            console.log(user,"19")
            if(user){
                console.log("find")
                res.status(400).json("Mobile no already exist");
            }
            else{
                req.body.status=true;
               
                const add=new Register_model(req.body);
                const userregister= await add.save();
                res.status(200).json({message:"User register"});
            }
                 
                     
             
         }
         else{
             res.send("Validation faied");
         }

     }catch(e){console.log(e)}
}

export const Getdoners=async (req:Request,res:Response)=>{
    const user=await Register_model.find({});
      if(user){
          res.send(user);
      }
      else{
          res.send("Error");
      }
}

export const Getsearchdata=async (req:Request,res:Response)=>{
    console.log(req.body);
    let{distt,state}=req.body;
    var s1=req.body.arrarr;
    console.log(s1,"57");
    distt=distt.toUpperCase();
    state=state.toUpperCase();
    
    ///////////////////////////////////////////////////////////////////////////////////////////demo/////
    var st=0
    var sorted:any=[];
    for(var j=0;j<s1.length;j++){
        if(s1[j]==="All"){
            console.log("find all")
            st=1
            break;
        }
    }
    if(st!==1){

        var i=0;
        s1.forEach (async (element:any) => {
            const userLogin=await Register_model.find({distt:distt,state:state,status:true,bloodgroup:element});
            i++;
            for(var k=0;k<userLogin.length;k++){
                sorted.push(userLogin[k]);
        
                   
                 }
                if(i===s1.length){
                    res.send(sorted);
                }})
    }
    else{
        
                    const users=await Register_model.find({distt:distt,state:state,status:true})
                    if(users){
                        users.sort();
                        res.send(users);
                }
                    else{
                         res.status(400).json("no record found");
                    }
            
                
    }
    //////////////////////////////////////////////////////////
    // try{
    //     if(req.body.bloodgroup==="All"){
    //         const users=await Register_model.find({distt:distt,state:state,status:true})
    //         if(users){
    //             res.send(users);
    //     }
    //         else{
    //              res.status(400).json("no record found");
    //         }
    
    //     }
    //     else{
    //         const users=await Register_model.find({distt:distt,state:state,bloodgroup:bloodgroup,status:true})
    //         if(users){
    //             res.send(users);
    //     }
    //         else{
    //              res.status(400).json("no record found");
    //         }
    //     }

    // }catch(e){console.log(e)}
}


export const EditDonor=async (req:Request,res:Response)=>{
    console.log(req.body)
    const phoneno=req.body;
    try{
        const user=await Register_model.findOne({phoneno:req.body.phoneno});
    
          if(user){
              user.status=false;
              console.log(user);
              const s=await user.save();
              res.status(200).json("Updated");
          }
          else{
              res.send("Error");
          }

    }catch(e){console.log(e)}
}

