import { comment } from '../../model/schema/comment'
import { user } from './../../model/schema/user';
import { blog } from './../../model/schema/blog';
const mongoose=require('mongoose')
let comments={
    comments:async(req,resp)=>{
        let userID=mongoose.Types.ObjectId(req.session.userID)
        let blogID=mongoose.Types.ObjectId(req.query.id)
        let data=await blog.aggregate([{
            $match:{
                _id:blogID
            }
        },{
            $lookup:{
                from: 'comments',
                localField: '_id',
                foreignField: 'blogID',
                as: 'data'
            }
        }
    ])
    // let comments=await comment.find().populate('blogID')
    // console.log(comments)
    let detail=data[0].data.map(async(i)=>{
        let x={}
        
        let userName=await user.find({_id:i.userID})
        x.name=userName[0].fname+" "+userName[0].lname
        x.comments=i.comment
        x.id=i._id
        return x
    })
    Promise.all(detail).then(d=>{
        resp.render("comment.hbs",{
            data:d,
            id:req.query.id
        })
    }).catch(e=>{
        console.log(e.message)
    }
    )
    },
    postcomments:async(req,resp)=>{
        let userID=mongoose.Types.ObjectId(req.session.userID)
        let blogID=mongoose.Types.ObjectId(req.query.id)

        let newcomment=new comment({
            ...req.body,
            userID:userID,
            blogID:blogID
        })
        await newcomment.save()
        let data=await blog.aggregate([{
            $match:{
                _id:blogID
            }
        },{
            $lookup:{
                from: 'comments',
                localField: '_id',
                foreignField: 'blogID',
                as: 'data'
            }
        }
    ])
    resp.redirect(`/comment?id=${req.query.id}`)
   
    }
}


export default comments
