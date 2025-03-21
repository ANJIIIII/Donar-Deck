const usermodel=require('../model/usermodel');
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");


const registerController= async (req,res) =>{
      try {
          const existingUser= await usermodel.findOne({email:req.body.email});
          console.log("hehe");
          if(existingUser){
           return  res.status(200).send({
                success:false,
                message:"user already exist",
             })
          } 
          const  salt=await bcrypt.genSalt(10)
          const hashedpass=await bcrypt.hash(req.body.password,salt);
          req.body.password = hashedpass;
        

          const user=new usermodel(req.body);
          await user.save();

         return res.status(200).send({
              success:true,
              message:"user registered successfully",
          })

      } catch (error) {
         console.log(error);
         console.log("hello")
        return res.status(500).send({
            success:false,
            message:'error in register'
         })
      }
}

const loginController = async (req,res) => {
    try {
        const user=await usermodel.findOne({email:req.body.email})
        if(!user){
          return res.status(404).send({
            success:false,
            message:"user not found"
          })
         }

         if (user.role !== req.body.role) {
            return res.status(500).send({
              success: false,
              message: "role dosent match",
            });
          }

          const comparedPass=await bcrypt.compare(req.body.password, user.password);
          if(!comparedPass){
            return res.status(500).send({
               success:false,
               message:"invalid credential"
             })
          }
          const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
          return res.status(200).send({
            success:true,
            message:"login successfully",
            token,
            user
          })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
           success:false,
           message:'error in login',
           error,
        })
    }

}
//6644f199096cd019a7827faa
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0ZjE5OTA5NmNkMDE5YTc4MjdmYWEiLCJpYXQiOjE3MTU3OTQ2NjYsImV4cCI6MTcxNTg4MTA2Nn0.2QVUNuUG30enmA6u1maSG4vsu1yVt4tH_ZN-cEcCA4Q

const currentUserController= async (req,res)=>{
  try {
   const user=await usermodel.findOne({_id:req.body.userId});
   console.log("hehe");
   return res.status(200).send({
      success:true,
      message:"user fetched",
      user,
   })
  } catch (error) {
     console.log(error);
     return res.status(500).send({
      success:false,
      message:"unable to get current user",
      error,
   })
  }
}
module.exports={currentUserController, loginController, registerController}

