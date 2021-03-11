const mongoose=require("mongoose")
import { user } from './../../model/schema/user';
let profilepic={
    profilepic:(req,resp)=>{
        // console.log(req.query)
        resp.render("updateprofilepic.hbs",{
            id:req.query.id
        })
    },
    postprofile:async(req,resp)=>{
        let id=mongoose.Types.ObjectId(req.query.id)
        let users=await user.find({_id:id})
        users[0].image=req.filename
        await users[0].save()
        resp.redirect('/profile')

    }
}
export default{profilepic}