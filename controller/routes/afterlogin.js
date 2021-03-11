import { blog } from './../../model/schema/blog';
import  path  from 'path';
let layout=path.join('/layout/body.hbs')
let afterlogin={

    afterlogin:async(req,resp)=>{
        let publicBlog=await blog.find({private:"public"})
        resp.render("afterlogin.hbs",{
            data:publicBlog,layout,
            title:"ALL PUBLIC BLOG"
        })
    }
}
export default{afterlogin}