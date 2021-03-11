
import { blog } from './../../model/schema/blog';
const mongoose=require("mongoose")
import  path  from 'path';
let layout=path.join('/layout/body.hbs')

let blogifind={
    blogfind:async (req,resp)=>{
        req.session.UserFind=""
        req.session.cookie.originalMaxAge=0
        let allBlog=await blog.find({private:"public"}).populate('userID')
        
        resp.render("firstpage.hbs",{
            data:allBlog
        })
        
    }
}
export default{blogifind}