import '../App.css';
import React, { useState,useEffect,dispatch ,createContext,useContext,useRef} from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { NavLink,Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import indianState from "../IndianStates";
import districts from "../districts";
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      // backgroundColor: theme.palette.background.paper,
      borderRadius: '10px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      background:"rgb(204 240 204)"
    },
  }),
);

function Registration() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const[isRegister,setIsRegister]=useState(false);
  const[error1,uerror1]=useState(false);
  const [errors,setErrors]=useState({});
  const[error2,uerror2]=useState("");
  const[error3,uerror3]=useState(false);
	const[error4,uerror4]=useState("");
  const[cancelicon,ucancelicon]=useState(false);
  const[cancelicon1,ucancelicon1]=useState(false);
  const[icon,uicon]=useState(false);
  const[icon1,uicon1]=useState(false);
  const [state, ustate] = useState("");
  const [distt, udistt] = useState("");
  const [array, uarray] = useState([]);
  
  const[search,usearch]=useState({
    searchvalue:""
  })

  const[aname,cname]=useState({
      first_name:"",
      last_name:"",
      age:"",
      bloodgroup:"",
      address:"",
      phoneno:"",
      distt:"",
      state:"",
      coronapositive:"",
      coronanegative:"",
      gender:""
});

const disttChange = (e) => {
  udistt(e.target.value);
};

const stateChange = (e) => {
  ustate(e.target.value);
  if(e.target.value){
    console.log(e.target.value)
    let x = districts.states.filter((item) => item.state === e.target.value);
    uarray(x[0].districts);

  }else{uarray([])}
};

const input=(event)=>{
 console.log(event.target.value);
  const {name,value}=event.target;
  if (aname.first_name.includes(" ")) {
    event.target.value = event.target.value.replace(/\s/g, "");
}
   
  cname((previousvalue)=>{
     return{
          ...previousvalue,
          [name]:value
}})
console.log(aname.state)
}

const onsubmit=(event)=>{
  event.preventDefault();
}


const submitdata=async()=>{
if(validate()){
  console.log(aname.email)
  const {first_name,last_name,age,bloodgroup,address,phoneno,coronapositive,coronanegative,gender}=aname;

  console.log("datasent");
  const res=await fetch("/registerdoner",{method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({first_name,last_name,age,bloodgroup,address,phoneno,coronapositive,coronanegative,gender,state,distt})})
        const data=await res.json();
       if(res.status===400){
          //  uerror1(true);
          //   uerror2("User already exist")
            setIsRegister(false)
            setOpen(true)
            // setTimeout(function(){
            //   uerror1(false)
            // },2000);
        }else{
          // uerror3(true);
          // uerror4("Register Successfully")
          setIsRegister(true)
          setOpen(true)
          cname({first_name:"",
          last_name:"",
          age:"",
          bloodgroup:"",
          address:"",
          phoneno:"",
          gender:"",
          coronapositive:"",
          coronanegative:""})
          ustate("");
          udistt("");
          
          uicon(false)
          uicon1(false)
          // setTimeout(function(){
          //   uerror3(false)
          // },3000);
        }
}
else{
  
  uerror1(true);
  uerror2("Please Fill All Fields Correctly")
  setTimeout(function(){
    uerror1(false)
  },200);
}
}

const validate=()=>{
  let err={};
  let isValid = true;
  var pattern1 = new RegExp(/^[A-Za-z]+$/);

  if (!aname.first_name) {
    isValid = false;
    errors["name"]="*required";
    }else if(!pattern1.test(aname.first_name)){
    isValid=false;
    errors["name"]="*Only Contains Alphabets";
  } else{ errors["name"]="";}

  if (!aname.last_name) {
    isValid = false;
    errors["lname"]="*required";
    }else if(!pattern1.test(aname.last_name)){
    isValid=false;
    errors["lname"]="*Only Contains Alphabets";
  } else{ errors["lname"]="";}
 
  if (!aname.gender) {
    isValid = false;
    console.log("name");
    errors["gender"]="*required";
    } else{ errors["gender"]="";}
 
  if (!aname.age) {
    isValid = false;
    errors["age"] = "*required";
   }
  else if(aname.age<18){
     isValid=false;
     errors["age"] = "*age must be 18+";
   }else{ errors["age"]="";}

if(!aname.coronanegative){
  isValid=false;
  errors["coronanegative"] = "*required";
}
else{
  var ny=[31,28,31,30,31,30,31,31,30,31,30,31];
var ly=[31,29,31,30,31,30,31,31,30,31,30,31];
var mn=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

var n=aname.coronanegative.length;
var a=aname.coronanegative.indexOf('/');
var b=aname.coronanegative.indexOf('/',a+1);
var dd=parseInt(aname.coronanegative.substring(0,a));
var mm=parseInt(aname.coronanegative.substring(a+1,b));
var yy=parseInt(aname.coronanegative.substring(b+1,n));
var md=0;

var n1=aname.coronapositive.length;
var a1=aname.coronapositive.indexOf('/');
var b1=aname.coronapositive.indexOf('/',a+1);
var dd1=parseInt(aname.coronapositive.substring(0,a));
var mm1=parseInt(aname.coronapositive.substring(a+1,b));
var yy1=parseInt(aname.coronapositive.substring(b+1,n));


if(mm>=1 && mm<=12)
{
	if(yy%4==0)
	{
		md=ly[mm-1];
	}
	else
	{
		md=ny[mm-1];
	}
}
if(dd<=0||dd>md||mm<=0||mm>12||yy<1900||yy>2030||aname.coronanegative.substring(0,a).length<2||aname.coronanegative.substring(a+1,b).length<2)
{
  
	console.log("invalid date");
  isValid=false;
  errors["coronanegative"] = "*Fill Correct Date(DD/MM/YYYY)";
}
else if(yy<yy1){
  isValid=false;
  errors["coronanegative"] = "*Please Check the Year";
  console.log("invalid date");
}
else if(yy===yy1){
if(mm<mm1){
  isValid=false;
  errors["coronanegative"] = "*Please Check the Month";
  console.log("invalid date");
}else if(mm===mm1){
  if(dd<dd1){
    isValid=false;
    errors["coronanegative"] = "*Please Check the Date";
    console.log("invalid date");
  }else{ errors["coronanegative"] = "";}
}
else{ errors["coronanegative"] = "";}
}

else
{
	console.log("valid","252")
	console.log(mn[mm-1] + " " + dd + ", " + yy)
  errors["coronanegative"]="";
}
}

if(!aname.coronapositive){
  isValid=false;
  errors["coronapositive"] = "*required";
}
else{
  var ny=[31,28,31,30,31,30,31,31,30,31,30,31];
var ly=[31,29,31,30,31,30,31,31,30,31,30,31];
var mn=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

var n=aname.coronapositive.length;
var a=aname.coronapositive.indexOf('/');
var b=aname.coronapositive.indexOf('/',a+1);
var dd=parseInt(aname.coronapositive.substring(0,a));
var mm=parseInt(aname.coronapositive.substring(a+1,b));
var yy=parseInt(aname.coronapositive.substring(b+1,n));
var md=0;

if(mm>=1 && mm<=12)
{
	if(yy%4==0)
	{
		md=ly[mm-1];
	}
	else
	{
		md=ny[mm-1];
	}
}

if(dd<=0||dd>md||mm<=0||mm>12||yy<1900||yy>2030||aname.coronapositive.substring(0,a).length<2||aname.coronapositive.substring(a+1,b).length<2)
{
	console.log("invalid date");
  isValid=false;
  errors["coronapositive"] = "*Fill Correct Date(DD/MM/YYYY)";
}
else
{
	console.log("valid")
	console.log(mn[mm-1] + " " + dd + ", " + yy)
  errors["coronapositive"]="";
}
}


   if(!aname.bloodgroup){
     isValid=false;
     errors["bloodgroup"]="*required";
   }else{errors["bloodgroup"]="";}
   
  if (aname.phoneno !== "undefined") {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(!aname.phoneno){
      errors["mobileno"]="*required";
    }
   else if (!pattern.test(aname.phoneno)) {
        isValid = false;
        errors["mobileno"]="*Provide Coreect Mobile No."
        // uicon1(false);
        // ucancelicon1(true)
        }else if(aname.phoneno.length !== 10){
        isValid = false;
        // uicon1(false);
        // ucancelicon1(true)
        errors["mobileno"]="*Length must be 10"
        }else
        {
          errors["mobileno"]=""
          // ucancelicon1(false)
          // uicon1(true)
        }
        }

        if(!state){
          isValid=false;
          errors["state"]="*required";
        }else{errors["state"]="";}
        if(!distt){
          isValid=false;
          errors["distt"]="*required";
        }else{errors["distt"]="";}
  
    return isValid;
}

  return (
   <>
   <div  className="covidmessagediv">
 <p >Had Covid? Be A Lifeline.Donate Plasma Now.</p>
   <Link style={{textDecoration:"none"}} to="search">
   <Button style={{margin:"10px"}}
    variant="contained">Search Donor
    </Button>
   </Link>
  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        {isRegister?<div className={classes.paper}>
          
        <h2 id="transition-modal-title" style={{color:"green"}}>Register Successfully</h2>
        <p id="transition-modal-description" style={{fontWeight:"500"}}>Your donation will go to save countless lives<br/>
         and so is appreciated, time and time again.<br/>
         I hope you know how much your Plasma is a gift<br/>
         to another’s life.Thank you kindly for your Donation.</p>
        <button className="closebtn" onClick={handleClose}>CLOSE</button>
      </div>:<div className={classes.paper}>
          
      <h2 id="transition-modal-title" style={{color:"red"}}>This Mobile Number Already In Use</h2>
      <button className="closebtn" onClick={handleClose}>CLOSE</button>
    </div>}
         
        </Fade>
      </Modal>
  
 <div className="page-content">
   <div className="form-v10-content" >
     <form className="form-detail"  onSubmit={onsubmit}>
       <div className="form-left">
       <h2 style={{textAlign:"center"}}>Register For Plasma Donor</h2>
         {error1?<div className="error-msg">
		<i className="fa fa-times-circle"></i>
		<WarningIcon style={{marginTop: "-1px",fontSize: "20px"}}/>{error2}
	  </div>:null}
    {error3?<div className="error-msg1">
		<i className="fa fa-times-circle"></i>
		{error4}
	  </div>:null}
   
         <div className="form-group">
           <div className="form-row form-row-1" style={{marginTop:"0px"}}>   
             <input type="text"
              name="first_name"
              id="first_name" 
              className="input-text" 
              placeholder="First Name" 
              required=""
              onChange={input} 
              value={aname.first_name}/>
              <div className="text-danger" >{errors.name}</div>
             
           </div>
           <div className="form-row form-row-2">
             <input type="text" 
             name="last_name" 
             id="last_name" 
             className="input-text" 
             placeholder="Last Name" 
             required="" 
             onChange={input} 
             value={aname.last_name}/>
             <div className="text-danger" >{errors.lname}</div>
           </div>
         </div>
         <div className="form-group">
           <div className="form-row form-row-1"  style={{marginTop:"0px"}}>   
           <input type="number"
          name="age" 
          id="first_name" 
          className="input-text" 
          placeholder="Age" 
          required="" 
          onChange={input} 
          value={aname.age}/>
          <div className="text-danger" >{errors.age}</div>
          </div>
           <div className="form-row form-row-2">
           <input type="text" 
           name="phoneno" 
           className="company" 
           id="company" 
           placeholder="10 Digits Mobile No" 
           required="" 
           onChange={input} 
           value={aname.phoneno}/>
           {icon1?<span className="spa" ><CheckCircleIcon/></span>:null}
           {cancelicon1?<span className="spa1" ><CancelIcon/></span>:null}
           <div className="text-danger">{errors.mobileno}</div>
           </div>
         </div>
        
         <div className="form-row">
           <input type="text"
            name="address"
            className="company" 
            id="company" 
            placeholder="Address" 
            required="" 
            onChange={input} 
            value={aname.address}/>
         </div>
  
         <div className="form-group">
         <div className="form-row form-row-1" style={{marginTop:"0px"}}>
       
            <label> Select Gender<span >*</span></label>
            <div className="text-danger" >{errors.gender}</div>
         </div>
         <div className="form-row form-row-2">
         <div className="radio-buttons">
        
         <input
           id="male"
           value="Male"
           name="gender"
           type="radio"
           checked={aname.gender === "Male"}
           onChange={input}
         />
         Male
         <input
           id="female"
           value="Female"
           name="gender"
           type="radio"
           
           checked={aname.gender === "Female"}
           onChange={input}
         />
         Female
         
       </div>
         </div>
         
     </div>
     <div className="form-group">
     <div className="form-row form-row-1" >
   
        <label> Select Blood Group<span>*</span></label>
        <div className="text-danger">{errors.bloodgroup}</div>
     </div>
     <div className="form-row form-row-2">
     <select value={aname.bloodgroup} onChange={input} name="bloodgroup">
        <option value="">Please Select BloodGroup</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option  value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option  value="O-">O-</option>
        <option  value="AB+">AB+</option>
        <option value="AB-">AB-</option>
     </select>
         </div>
     
 </div>
     <div className="form-group">
     <div className="form-row form-row-1" >
    <label >Please Select State<span>*</span></label>
    <div className="text-danger">{errors.state}</div>
     </div>
   <div className="form-row form-row-2">
   <select
   name="state"
   id="State"
   className="w-100 p-2"
   value={state}
   onChange={stateChange}
 >
   <option value="" id="none">
     Please Select State
   </option>
   
   {indianState.map((item, index) => {
     return (
       <option key={index} value={item}>
         {item}
       </option>
     );
   })}
 </select>
   </div>
 </div>
     <div className="form-group">
     <div className="form-row form-row-1" >
    <label >Please Select Distt<span >*</span></label>
    <div className="text-danger">{errors.distt}</div>
     </div>
   <div className="form-row form-row-2">
   <select
   name="district"
   id="district"
   className="w-100 p-2"
   value={distt}
   onChange={disttChange}
 >
   <option value="" id="none">
     Please Select distt
   </option>
   ;
   {array.map((item, index) => {
     return (
       <option key={index} value={item}>
         {item}
       </option>
     );
   })}
 </select>
   </div>
 </div>

    
                   <div className="form-group">
                   <div className="form-row form-row-1">
                 
                      <label > Choose Corona Positive Date<span>*</span></label>
                      <div className="text-danger" style={{marginTop:"2px",color:"red",fontSize:"14px"}}>{errors.coronapositive}</div>
                   </div>
                   <div className="form-row form-row-2">
                       <input type="text" 
                       name="coronapositive" 
                       id="last_name" 
                       className="input-text" 
                       placeholder="DD/MM/YYYY" 
                       required="" 
                       maxLength="10"
                       onChange={input} 
                       value={aname.coronapositive}/>
                       
                   </div>
                   
               </div>
               <div className="form-group">
               <div className="form-row form-row-1" >
             
               <label>Choose Corona Negative Date<span>*</span></label>
               <div className="text-danger" style={{marginTop:"2px",color:"red",fontSize:"14px"}}>{errors.coronanegative}</div>
               </div>
              
               <div className="form-row form-row-2">
                   <input type="text" 
                 
                   name="coronanegative" 
                   id="last_name" 
                   className="input-text" 
                   maxLength="10"
                   placeholder="DD/MM/YYYY" 
                   required="" 
                   onChange={input} 
                   value={aname.coronanegative}/>
                   
               </div>
               
           </div>
               
               <div className="form-row-last">
               <input type="submit"
                id="dd" 
                name="register" 
                className="register" 
                value="Register" 
                onClick={submitdata} />
           </div>
               </div>
              
               </form>
               
   </div>
 </div>
 </div>
   </>
  );
}

export default Registration;
