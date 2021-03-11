import { user } from './../../model/schema/user';
import { blog } from './../../model/schema/blog';
const mongoose=require("mongoose")
import  path  from 'path';
let layout=path.join('/layout/body.hbs')



let allBlogs={
    allBlogs:async(req,resp)=>{
        let data=await user.aggregate([{
            $match:{
                _id:mongoose.Types.ObjectId(req.session.userID)
            }
        },{
            $lookup:{
                from: 'blogs',
                localField: '_id',
                foreignField: 'userID',
                as: 'data'
              }
        }])
    resp.render("allblogs.hbs",{
        data:data[0].data,
        layout,
        title:"AllBlog"
    })
    }
}


export default{allBlogs}