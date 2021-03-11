import { blog } from './../../model/schema/blog';
import  mongoose  from 'mongoose';
let deleteBlog={
    deleteBlog:async(req,resp)=>{
        let query={}
        if(req.query.id){
        query._id=mongoose.Types.ObjectId(req.query.id)
        await blog.findByIdAndDelete(query)
        return resp.redirect('/allBlogs')

        }
        return resp.redirect('/allBlogs')
    }
}
export default{deleteBlog}