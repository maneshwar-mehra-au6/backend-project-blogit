import { blog } from './../../model/schema/blog';
import { comment } from './../../model/schema/comment';

let deletcomment={

    deletcomment:async(req,resp)=>{
        let comments=await comment.find({_id:req.query.id})
        let blogID=comments[0].blogID
        if(req.session.userID==comments[0].userID){
            await comment.deleteOne({_id:req.query.id})
            return resp.redirect(`/comment?id=${blogID}`)

        }
        return resp.redirect(`/comment?id=${blogID}`)
    }
}
export default{deletcomment}