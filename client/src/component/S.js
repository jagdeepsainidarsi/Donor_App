import { Row, Col, Table } from "react-bootstrap";
import indianState from "../IndianStates";
import districts from "../districts";
import { useState } from "react";
import { NavLink,Link } from "react-router-dom";
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import Select from "react-select"
import "../App.css"
import Navbar from "./Navbar"
export default function Search() {
  const [state, ustate] = useState("");
  const [distt, udistt] = useState("");
  const[record,setrecord]=useState("");
  const [array, uarray] = useState([]);
  const[spinner,uspinner]=useState(false);
  const[error1,uerror1]=useState(false);
  const[error2,uerror2]=useState("");
  const[searchdata,setsearchdata]=useState([]);
  const[s,us]=useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const data = [
    {
      value: 0,
      label:"A+"
    },
    {
      value: 1,
      label:"A-"
    },
    {
      value: 2,
      label:"B+"
    },
    {
      value: 3,
      label:"B-"
    },
    {
      value: 4,
      label:"AB+"
    },
    {
      value: 5,
      label:"AB-"
    },
    {
      value: 6,
      label:"O+"
    },
    {
      value: 7,
      label:"O-"
    },
    {
      value: 7,
      label:"All"
    }
  ];
  const senddata=async()=>{
    
    try{
  if(distt===""||state===""||selectedValue.length===0){
    uerror1(true);
    uerror2("Please Fill Correctly")
  }else{
    // uspinner(true);
    uerror1(false);
      const res=await fetch("/senddata",{method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({distt:distt,state:state,arrarr:selectedValue})})
            const data=await res.json();
            if(data.length===0){
              us(false);
              // uspinner(false);
              setrecord("No Record Found")
            }else{
               console.log(data)
              setsearchdata(data);
              us(true);
              // uspinner(false)
              setrecord("");
            }
        if(!res.status===200){
          console.log(res.json.message,"47")
          const error=new Error(res.error);
          throw error;
      }
    }
  }catch(err){
      console.log(err);
   }
  }
  const insubmit=(event)=>{
event.preventDefault();
  }
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.label) : []);
    
  }
 
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
  const edit=async (key)=>{
    //event.preventDefault();
    console.log(key);
    const phoneno=key.phoneno;
    console.log(key.phoneno)
    
    const res=await fetch("/editdonor",{method:"POST",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify({phoneno})})
    const data=await res.json();
    console.log(data);
    if(res.status===200){
      console.log("updated");
    }else{
      console.log("not updated");
    }
    
    setsearchdata((olditems)=>{
      return olditems.filter((Array,index)=>{
          return Array.phoneno!==phoneno;
      })
  })
}

  return (
    <>
    // {spinner?<div className="loading" id="loading" ><div className="loader"></div></div>:null}
    
    <Link style={{textDecoration:"none"}} to="/"> <Button style={{marginTop:"60px",marginLeft:"10px"}} variant="contained">Home</Button></Link>
    {error1?<div className="error-msg11" style={{justifyContent:"center"}}>
		<i className="fa fa-times-circle"></i>
		<WarningIcon style={{marginTop: "-1px",fontSize: "20px"}}/>{error2}
	  </div>:null}
    <form method="POST" onSubmit={insubmit}>
    <div className="head1">
    
    <div className="form-group">
   
    <div className="form-row form-row-1" style={{marginTop:"20px"}}>
   <label style={{paddingTop:"50px"}}>Please Select State</label>
    </div>
  <div className="form-row form-row-2">
  <select
  name="state"
  id="State"
  className="w-100 p-2"
  value={state}
  onChange={stateChange}>
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
    <div className="form-row form-row-1" style={{marginTop:"20px"}}>
   <label style={{paddingTop:"30px"}}>Please Select Distt</label>
    </div>
  <div className="form-row form-row-2">
  <select
  name="district"
  id="district1"
  className="w-100 p-2"
  value={distt}
  onChange={disttChange}>
  <option value="" id="none">
    Please Select Distt
  </option>
  
  {array.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  })}
</select>
  </div>
 
</div >


<div className="form-group">
    <div className="form-row form-row-1" style={{marginTop:"20px"}}>
   <label style={{paddingTop:"30px"}}>Please Select BloodGroup</label>
    </div>
  <div className="form-row form-row-2" style={{marginBottom:"5px"}}>
  <Select
  className="dropdown"
  placeholder="Select Option"
  options={data} 
  onChange={handleChange} 
  isMulti
  />
  </div></div>
<div className="btndiv"> <input type="submit"  value="SEARCH" onClick={senddata}/>
</div>
</div>
</form>


  {s?  <div id="bottom">
  <div id="over">
    <table>
       <thead>
       <tr id="upper">
       <th id="left">#</th>
       <th id="left">Name</th>
       <th id="right">Gender</th>
       <th id="right">PhoneNo</th>
       <th id="right">BloodGroup</th>
       <th id="right">Distt</th>
       <th id="right">State</th>
       <th id="right">PositiveDate</th>
       <th id="right">NegativeDate</th>
       <th id="right">Hide</th>
       </tr>
       </thead>
      
       {searchdata.map((val,key)=>{
         return (<tbody key={key}><tr>
                  <td>{key+1}</td>
                  <td>{val.first_name+" "+val.last_name}</td>
                  <td>{val.gender}</td>
                  <td>{val.phoneno}</td>
                  <td>{val.bloodgroup}</td>
                  <td>{val.distt}</td>
                  <td>{val.state}</td>
                  <td>{val.coronapositive}</td>
                  <td>{val.coronanegative}</td>
                  <td><Button style={{height:"30px"}} id={val.phoneno}  onClick={()=>{edit(val)}} variant="contained">Hide</Button></td>
                  </tr>
                  </tbody>)})}
    </table>
  </div>
</div>:<div id="bottom1" style={{textAlign:"center",background:"white"}}><h1>{record}</h1></div>}
     
    </>
  );
}