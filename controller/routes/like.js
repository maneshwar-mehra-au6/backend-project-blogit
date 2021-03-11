import { user } from './../../model/schema/user'
import { blog } from './../../model/schema/blog'
const mongoose=require('mongoose')
let like={
    like:async (req,resp)=>{
        let userID=req.session.userID
        let blogID=req.query.id
        let seeBlog=await blog.find({_id:blogID})
        let presentlike=seeBlog[0].like.filter((i)=>{
            return i.like==userID
        })
        let presentdislike=seeBlog[0].dislike.filter((i)=>{
            return i.dislike==userID
        })
        if(presentlike.length==0 && presentdislike.length==0){
            await seeBlog[0].like.push({like:userID})
            await seeBlog[0].save()
        }
        else if(presentlike.length==0 &&presentdislike.length!=0 ){
            let likeID=presentdislike.filter(i=>{
                return i.dislike==userID
            })
            await seeBlog[0].dislike.id(likeID[0]._id).remove()
            await seeBlog[0].save()
            await seeBlog[0].like.push({like:userID})
            await seeBlog[0].save()

        }
        resp.redirect('/publicblog')
    }
}
export  default{like}


