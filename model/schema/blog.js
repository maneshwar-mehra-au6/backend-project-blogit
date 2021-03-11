const mongoose=require("mongoose")

let Simage=mongoose.Schema({
    image:String
})
let like=mongoose.Schema({
    like:String
})
let dislike=mongoose.Schema({
    dislike:String
})
const blogSchema=mongoose.Schema({
    Blogtitle:String,
    image:[Simage],
    explain:String,
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    date:{
        type:Date,
        defaut:Date.now()
    },
    private:{
        type:String,
        default:"private"
    },
    like:[like],
    dislike:[dislike]
})

export let blog=mongoose.model("blog",blogSchema)