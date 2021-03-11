import { validationResult } from "express-validator"
import path from "path"
import { user } from './../../model/schema/user';
let layout=path.join('/layout/body.hbs')
let forget={
    forget:(req,resp)=>{
        resp.render("forget.hbs",{
            title:"forget",
            layout,
        })
    },
    postforget:async(req,resp)=>{
        let error=validationResult(req)
        if(!error.isEmpty()){
            let errors={}
            for(let i=0 ;i<error.array().length;i++){
                errors[error.array()[i].param]=error.array()[i].msg
            }
            return resp.render("forget.hbs",{
                layout,
                error:errors,
                ...req.body,
                title:"forget"
            })
        }
        let UserFind=await user.find({email:req.body.email})
        let errors={email:"enter the correct email id"}
        if(UserFind.length==0){
            return resp.render("forget.hbs",{
                layout,
                title:"forget",
                error:errors,
                ...req.body
            })
        }
        
        let match=false
        if(UserFind[0].question==req.body.question){
            match=true
        }
        if(match==false){
            let error={question:"enter the correct answere"}
            return resp.render("forget.hbs",{
                layout,
                error,
                title:"forget",
                ...req.body
            })
        }
        req.session.userID=UserFind[0]
        return resp.redirect('/changepass')
    }
}
export default{forget}
