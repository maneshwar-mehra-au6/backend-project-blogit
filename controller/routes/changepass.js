import { validationResult } from "express-validator"
import path from "path"
import { user } from './../../model/schema/user';
const bcrypt=require("bcrypt")
let layout=path.join('/layout/body.hbs')
let changepass={
    changepass:(req,resp)=>{
        resp.render("changerpass.hbs",{
            layout,
            title:"password"
        })
    },
    postchangepass:async(req,resp)=>{
        let error=validationResult(req)
        let errors={}
        if(!error.isEmpty()){
            for(let i=0 ;i<error.array().length;i++){
                errors[error.array()[i].param]=error.array()[i].msg
            }
            return resp.render("changerpass.hbs",{
                layout,
                title:"password",
                error:errors
            })
        }
        errors={password12:"password not matched"}
        if(req.body.password!=req.body.password2){
            return resp.render("changerpass.hbs",{
                layout,
                title:"password",
                error:errors
                
            })
        }
        let userFind=await user.find({_id:req.session.userID})
        let salt = await bcrypt.genSalt(10)
        req.body.password=await bcrypt.hash(req.body.password,salt)
        userFind[0].password=req.body.password
        await userFind[0].save()
        resp.redirect('/login')

    }
}
export default{changepass}