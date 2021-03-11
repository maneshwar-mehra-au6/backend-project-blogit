let mongoose=require("mongoose")


let Schema=mongoose.Schema({
    comment:String,
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    blogID:{
        type:mongoose.Types.ObjectId,
        ref:"blog"

    }
})

export let comment=mongoose.model('comment',Schema)