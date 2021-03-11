import { validationResult } from "express-validator"
import  mongoose  from "mongoose";
import path from "path"
import { user } from './../../model/schema/user';
import { blog } from './../../model/schema/blog';
let layout=path.join('/layout/body.hbs')

let createBlog={
    createBlog:(req,resp)=>{
        resp.render("createblog.hbs",{
            title:"createBlog",
            layout,
        })
    },
    postcreateBlog:async(req,resp)=>{
        try{
            let error=validationResult(req)
            if(!error.isEmpty()){
                let errors={}
                for(let i=0;i<error.array().length;i++){
                    errors[error.array()[i].param]=error.array()[i].msg
                }
                return resp.render("createblog.hbs",{
                    ...req.body,
                    title:"blog",
                    layout,
                    error:errors
                })
            }
            let bloGS=new blog({
                ...req.body,
                userID:req.session.userID
            })
            for(let i=0;i<req.files.length;i++){
                bloGS.image.push({image:req.files[i].filename})
            }
            await bloGS.save()
            return resp.redirect('/allBlogs')

    }
    catch(e){
        console.log(e.message)
    }
    }
}   

export  default{createBlog}