import React, { useState,useEffect } from "react";
import '../App.css';
import { Link, NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Navbar from "./Navbar"

const Search=()=>{
   
    useEffect(()=>{
        callAboutPage();
       
    },[]);
    const[spinner,uspinner]=useState(true);
   const[search,usearch]=useState({
        searchvalue:"",
        
    })
    const[array,uarray]=useState([]);
    const handleinput=(event)=>{
        const {name,value}=event.target;
        usearch((previousvalue)=>{
          return{
            ...previousvalue,
            [name]:value
      }})
      }
      const callAboutPage=async ()=>{
       
        try{
            const res=await fetch("/getdoners",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json" 
                    
                },
                credentials:"include"
            }) 

             const data=await res.json();
             uarray(data);
             uspinner(false)
           if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            }
    }
      const onsubmit=(event)=>{
          event.preventDefault();
      }
     
return(
    <>
    {spinner?<div className="loading" id="loading"><div className="loader"></div></div>:null}
   
     <Navbar/>
     <Link style={{textDecoration:"none"}} to="/"> <Button style={{margin:"60px"}} variant="contained">Home</Button></Link>
    <div id="head">
       <div id="textbox">
      
       <input  value={search.searchvalue} name="searchvalue" onChange={handleinput} placeholder="Search The Donor By State Name" id="input"type="text"/></div>
      
       <div id="bottom">
          <div id="over">
           <table>
               <thead>
               <tr id="upper">
               <th id="left">#</th>
               <th id="left">Name</th>
               <th id="right">PhoneNo</th>
               <th id="right">Address</th>
               <th id="right">Distt</th>
               <th id="right">State</th>
               <th id="right">PositiveDate</th>
               <th id="right">NegativeDate</th>
               </tr>
               </thead>
              
               {array.filter((val)=>{if(search===""){
                   return val;
               }else if(val.state.toLowerCase().includes(search.searchvalue.toLowerCase())){return val};
               }).map((val,key)=>{
    return (<tbody key={key}><tr><td>{key+1}</td><td>{val.first_name+" "+val.last_name}</td><td>{val.phoneno}</td><td>{val.address}</td><td>{val.distt}</td><td>{val.state}</td><td>{val.coronapositive.substring(0,10)}</td><td>{val.coronanegative.substring(0,10)}</td></tr></tbody>)})}
               

           </table>
          </div>
        
        
        
       </div>
   </div>
   
    </>

)
}
export default Search;