import express from "express"
import Member from "../model/userschema.js"

const router = express.Router()

router.get('/', (req, res)=>{
    res.send('welcome to home page auth js')
})

router.post('/register', async (req, res)=>{

    const {fullname,phone,block ,famMembers,income,password,cpassword} = req.body;

    if (!fullname|| !phone||!block || !famMembers||!income||!password||!cpassword){
       return res.status(422).json({message: `please fill all the feilds`})
    } else if(password != cpassword){
        return res.status(422).json({message: `Passwords do not match`}) 
    }


    try {
        const userExist = await Member.findOne({fullname: fullname})

        if(userExist){
            return res.status(422).json({message: `member already exist`})
        }

        const member = new Member({fullname,phone,block ,famMembers,income,password,cpassword});

        await member.save()

        res.status(201).json({message: `member registration successfull`})

    } catch (error) {
        console.log(error);
    }

})

router.post('/signin', async (req, res)=>{
    try {
        const {fullname, password} = req.body

        if(!fullname || !password) {
            res.status(422).json({message: `please provide credentials` })
        }
    
        const matchMember = await Member.findOne({fullname: fullname, password: password})
        if (matchMember) {
          res.status(200).json({message: `welcome`})  
        } else {
            res.status(400).json({message: `invalid credentials`})
        }
    } catch (error) {
        console.log(error);
    }
})

export default router