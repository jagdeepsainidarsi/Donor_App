import mongoose, { Schema, Document } from "mongoose";

 export interface Donor extends Document {
    first_name: String;
    last_name: String;
    age:Number;
    bloodgroup:String;
    phoneno: String;
    address:String;
    distt:String;
    state:String;
    gender: String;
    coronapositive: String;
    coronanegative: String;
    status:Boolean;
  }

 const registrationSchema=new mongoose.Schema({
first_name:{type:String,
    required:true
},
last_name:{type:String,
},
age:{type:Number,
    required:true
},
gender:{type:String,
    required:true
},
bloodgroup:{type:String,
required:true},
phoneno:{type:String,
    required:true
},
address:{type:String,

},
distt:{type:String,
    required:true
},
state:{type:String,
    required:true
},

coronapositive:{type:String,
    required:true
},
coronanegative:{type:String,
    required:true
},

status:{type:Boolean,
required:true}


})


// const Registration_model=mongoose.model("REGISTRATIONSCHEMA",registrationSchema);
// module.exports=Registration_model;
// export default mongoose.model<JD>("REGISTRATIONSCHEMA",registrationSchema)
const Registration_model = mongoose.model<Donor>("REGISTRATIONSCHEMA", registrationSchema);
module.exports= Registration_model;
