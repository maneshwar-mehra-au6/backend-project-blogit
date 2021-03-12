
import { blog } from './../../model/schema/blog';
const mongoose=require("mongoose")
import  path  from 'path';
let layout=path.join('/layout/body.hbs')

let search={
    blogfind:async (req,resp)=>{
        if(req.body.search==""){
            return resp.redirect('/')
        }
        req.session.UserFind=""
        req.session.cookie.originalMaxAge=0
       
        let allBlog=await blog.find({private:"public",Blogtitle:`${req.body.search}`}).populate('userID')
        return resp.render("search.hbs",{
        data:allBlog
        })
        
    }
}
export default{search}