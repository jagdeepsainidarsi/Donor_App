import React,{useEffect, useState} from "react"
import {Multiselect} from "multiselect-react-dropdown"
import Select from "react-select"
const Dropdown=()=>{
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
        }
      ];
     
      // set value for default selection
      const [selectedValue, setSelectedValue] = useState([]);
     
      // handle onChange event of the dropdown
      const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.label) : []);
        
      }
     
      return (
        <div className="App">
          <h3>Get selected by only value for multi select - <a href="https://www.cluemediator.com">Clue Mediator</a></h3>
     
          <Select
            className="dropdown"
            placeholder="Select Option"
            // value={data.filter(obj => selectedValue.includes(obj.label))} // set selected values
            options={data} // set list of the data
            onChange={handleChange} // assign onChange function
            isMulti
           
          />
     <h3>{selectedValue}</h3>
         
        </div>
      );
        
        
    
}

export default Dropdown;