const mongoose=require("mongoose")

const Schema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    image:String,
    question:String
})

export let user=mongoose.model("user",Schema)