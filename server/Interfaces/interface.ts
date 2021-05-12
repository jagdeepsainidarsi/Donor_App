import {Document} from "mongoose"
export default interface JD extends Document{
    first_name:string,
    last_name:string,
    email:string,
    address:string,
    phoneno:number,
    distt:string,
    state:string,
    country:string,
    coronapositive:Date,
    coronanegative:Date
  
}