import mongoose from "mongoose";

function connectDB(){
    
const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log(`database connected`)
}).catch((err)=>{
    console.log(`database not connected`);
})
} 

export default connectDB