import { check } from "express-validator"
import sign from "./routes/signup"
import login from "./routes/login"
import  path  from 'path';
import forget from "./routes/forgetpass"
import changerpass from "./routes/changepass"
import createBlog from "./routes/createblog"
import allBlog from "./routes/allblog"
import arth from "./validate"
import updateBlog from "./routes/updateBlog"
import deleteBlog from "./routes/deleteblog"
import updateblogphoto from "./routes/updateblogphoto"
import deleteBlogphoto from "./routes/deleteblogphoto"
import userProfile from "./routes/profile"
import profilepic from "./routes/profilepicupdate"
import deleteprofile from "./routes/deleteprofile"
import publicBlog from"./routes/afterlogin"
import like from "./routes/like"
import dislike from "./routes/dislike"
import comment from './routes/comment';
import deletcomment from "./routes/deletecomment"
import  first from "./routes/first"
const multer=require("multer")
const express=require("express")
const route=express.Router()

// use multer
let diskStroage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"/../view/upload"))
    },
    filename:(req,file,cb)=>{
        let filename=file.fieldname+"-"+Date.now()+"-"+path.extname(file.originalname)
        req.filename=filename
        cb(null,filename)
    }
})
const upload=multer({storage:diskStroage})

// uploading many files
let diskStroage2=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"/../view/upload"))
    },
    filename:(req,file,cb)=>{
        let filename=file.fieldname+"-"+Date.now()+"-"+path.extname(file.originalname)
        cb(null,filename)
    }
})

const upload2=multer({storage:diskStroage2})
route.get('/signup',sign.sign.signup)
route.post('/signin',[upload.single('image'),
    check("fname","enter the first name").not().isEmpty(),
    check("lname","enter the lastname").not().isEmpty(),
    check("email","enter  a valid email").isEmail(),
    check("password","enter the password minimum length 8").isLength({min:8}),
    check("question","enter the valid things minimum 3 characte").isLength({min:3})
],sign.sign.signin)
route.get('/login',login.login.login)
route.post('/login',[
    check("email","enter  a valid email").isEmail(),
    check("password","enter the correct password").isLength({min:8})
],login.login.postLogin)


route.get('/forget',forget.forget.forget)
route.post('/forget',[
    check("email","enter  a valid email").isEmail(),
    check("question","enter the answere").isLength({min:3})
]
,forget.forget.postforget)

route.get('/changepass',arth.arth,changerpass.changepass.changepass)

route.post('/changepass',[
    check("password","enter the password minimum length 8").isLength({min:8}),
    check("password2","enter the password minimum length 8").isLength({min:8}),
],changerpass.changepass.postchangepass)
route.get('/createBlog',arth.arth,createBlog.createBlog.createBlog)

route.post('/createBlog',arth.arth,upload2.array('image'),
check("Blogtitle","enter the block title").not().isEmpty(),
check("explain","enter somthing").not().isEmpty()
,createBlog.createBlog.postcreateBlog)

route.get('/allBlogs',arth.arth,allBlog.allBlogs.allBlogs)
route.get('/updateblog',arth.arth,updateBlog.updateBlog.updateBlog)
route.post('/updateblog',arth.arth,upload2.array('image'),[
    check("explain","enter somthing").not().isEmpty()
],updateBlog.updateBlog.postupdateBlog)
route.get('/deleteblog',arth.arth,deleteBlog.deleteBlog.deleteBlog)
route.get('/updatephoto',arth.arth,updateblogphoto.updateblogphoto.updateblogphoto)
route.post('/updatephoto',arth.arth,upload.single('image'),updateblogphoto.updateblogphoto.postupdateblogphoto)
route.get('/deletephoto',arth.arth,deleteBlogphoto.deleteBlogphoto.deleteBlogphoto)
route.get('/profile',arth.arth,userProfile.porfile.profile)
route.get('/updateprofilpic',arth.arth,profilepic.profilepic.profilepic)
route.post('/updateprofilpic',arth.arth,upload.single('image'),profilepic.profilepic.postprofile)
route.get('/deleteprofilpic',arth.arth,deleteprofile.deleteprofilpic.deleteprofilpic)
route.get('/publicblog',arth.arth,publicBlog.afterlogin.afterlogin)

route.get('/like',arth.arth,like.like.like)
route.get('/dislike',arth.arth,dislike.dislike.dislike)

route.get('/comment',arth.arth,comment.comments)
route.post("/comment",arth.arth,comment.postcomments)

route.get('/deletecomment',arth.arth,deletcomment.deletcomment.deletcomment)
route.get('/',first.blogifind.blogfind)
export default{route}