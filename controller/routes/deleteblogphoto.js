import { blog } from './../../model/schema/blog';
const mongoose=require("mongoose")


let deleteBlogphoto={
    deleteBlogphoto:async(req,resp)=>{
        let blogs=await blog.find({_id:req.query.blogid})
        blogs[0].image.id(req.query.id).remove()
        await blogs[0].save()
        resp.redirect('/allBlogs')
    }
}
export default{deleteBlogphoto}