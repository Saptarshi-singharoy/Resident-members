import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  block:{
    type: String,
    required: true
  },
  famMembers: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
});

userSchema.pre('save', async function(next){
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10)
    this.cpassword = await bcrypt.hash(this.cpassword, 10)
  }
  next()
})

const Member = mongoose.model("MEMBER", userSchema);

export default Member;
