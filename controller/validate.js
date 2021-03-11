let arth=(req,resp,next)=>{
    if(!req.session.userID){
        return resp.redirect('/signup')
    }
    next()
}
export default{arth}