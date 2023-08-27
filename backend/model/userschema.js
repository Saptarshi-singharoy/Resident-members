import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre('save', async function(next){
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10)
    this.cpassword = await bcrypt.hash(this.cpassword, 10)
  }
  next()
})

userSchema.methods.generateAuthToken = async function(){
  try {
    const token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = await this.tokens.concat({token: token})
    await this.save()
    return token
  } catch (error) {
    console.log(error);
  }
}

const Member = mongoose.model("MEMBER", userSchema);

export default Member;
