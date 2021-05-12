const mongoose=require('mongoose');

const DB='mongodb+srv://jagdeep:jagdeep@cluster0.qrq4h.mongodb.net/myfirstmernstack?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false}).then(()=>{
    console.log("connected");
}).catch((err)=>console.log(err))