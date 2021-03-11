import { validationResult } from "express-validator"
import path from "path"
import { user } from './../../model/schema/user';
const bcrypt=require("bcrypt")
let layout=path.join('/layout/body.hbs')


let login={
    login:(req,resp)=>{
        req.session.UserFind=""
        req.session.cookie.originalMaxAge=0
        // console.log(req.session)
        resp.render("login.hbs",{
            layout
        })
    },
    postLogin:async(req,resp)=>{
        let error=validationResult(req)
        if(!error.isEmpty()){
            let errors={}
            for(let i=0 ;i<error.array().length;i++){
                errors[error.array()[i].param]=error.array()[i].msg
            }
            return resp.render("login.hbs",{
                layout,
                error:errors,
                ...req.body
            })
        }
        let UserFind=await user.find({email:req.body.email})
        // console.log(UserFind)
        let errors={email:"enter the correct email id"}
        if(UserFind.length==0){
            return resp.render("login.hbs",{
                layout,
                title:"login",
                error:errors,
                ...req.body
            })
        }
        
        let match=await bcrypt.compare(req.body.password,UserFind[0].password)
        if(!match){
            let error={password:"enter the correct password"}
            return resp.render("login.hbs",{
                layout,
                error,
                title:"login",
                ...req.body
            })
        }
        req.session.userID=UserFind[0]._id
        // console.log(req.session)
        resp.redirect("/publicblog")
    }
}

export default{login}
