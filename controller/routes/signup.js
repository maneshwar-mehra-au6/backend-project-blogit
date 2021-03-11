import { validationResult } from "express-validator"
import path from "path"
const bcrypt=require("bcrypt")
import { user } from './../../model/schema/user';
let layout=path.join('/layout/body.hbs')
let sign={
    signup:(req,resp)=>{
        req.session.UserFind=""
        req.session.cookie.originalMaxAge=0
        resp.render("signup.hbs",{
            layout,
            title:"signup"

        })
    },
    signin:async(req,resp)=>{
        // console.log(req.body)
        try{
        let error=validationResult(req)
        // console.log(error.array())
        if(!error.isEmpty()){
            let errors={}
            for(let i=0;i<error.array().length;i++){
                errors[error.array()[i].param]=error.array()[i].msg
            }
            return resp.render("signup.hbs",{
                layout,
                title:"signup",
                error:errors,
                ...req.body
            })
        }
        let  userFind = await user.find({email:req.body.email})
        let errors={email:"alredy present write another emailId"}
       if(userFind.length!=0){
           return resp.render("signup.hbs",{
               layout,
               title:"signup",
               error:errors,
               ...req.body
           })
       }
       let newUser=await user({
           ...req.body,
           image:req.filename
       })
    //    console.log(newUser,req.body)
       let salt = await bcrypt.genSalt(10)
       newUser.password=await bcrypt.hash(req.body.password,salt)
       await newUser.save()
       resp.redirect('/login')
    }
    catch(e){
        console.log(e.message)
        return resp.send("somthing error happen")
    }
    }
}
export default{sign}
