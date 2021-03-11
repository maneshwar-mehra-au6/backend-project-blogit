let mongoose=require("mongoose")
import { user } from './../../model/schema/user';
let deleteprofilpic={
    deleteprofilpic:async(req,resp)=>{
        // console.log(req.query)
        let id=mongoose.Types.ObjectId(req.query.id)
        let userFind=await user.find({_id:id})
        userFind[0].image=""
        await userFind[0].save()
        resp.redirect('/profile')
    }
}

export default{deleteprofilpic}