import { blog } from './../../model/schema/blog';
import  mongoose  from 'mongoose';
import { validationResult } from 'express-validator';
let updateBlog={
    updateBlog:async(req,resp)=>{
        let query={}
        if(req.query.id){
            query._id=mongoose.Types.ObjectId(req.query.id)
            let blogsUpdate=await blog.findById(query)
            return resp.render("updateBlog.hbs",{
                ...(blogsUpdate._doc)
            })
        }
        else{
            return resp.redirect('/allBlogs')
        }
    },
    postupdateBlog:async(req,resp)=>{
        let errors=validationResult(req)
        if(!errors.isEmpty()){
            let error={}
            error.explain="Enter somthing in blog"
            let query={}
            if(req.query.id){
                query._id=mongoose.Types.ObjectId(req.query.id)
                let blogsUpdate=await blog.findById(query)
                return resp.render("updateBlog.hbs",{
                    ...(blogsUpdate._doc),
                    error
                })
            }
        }
        let id=mongoose.Types.ObjectId(req.query.id) 
        await blog.updateOne({
            _id:id
        },{
        $set :{
            ...req.body
        }
    }
    )
    let bloGS=await blog.find({_id:req.query.id})
    for(let i=0;i<req.files.length;i++){
        bloGS[0].image.push({image:req.files[i].filename})
    }
    await bloGS[0].save()
    return resp.redirect('/allBlogs')
    }
}

export default{updateBlog}

