let layout=path.join('/layout/body.hbs')
import path from "path"
import { user } from './../../model/schema/user';
import { blog } from './../../model/schema/blog';
const mongoose=require("mongoose")

let porfile={
    profile:async(req,resp)=>{
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
        // console.log(data[0])
        // return resp.send(data)
        resp.render("userprofile.hbs",{
            ...data[0],
            layout,
            title:"Profile"
        })
    }
}
export default{porfile}
