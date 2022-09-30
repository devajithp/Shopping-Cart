var collection=require("../config/collection")
var db=require("../config/connection")
var promise=require("promise")
var objectId = require("mongodb").ObjectID
var bcrypt= require("bcrypt")

module.exports={

   doSignUp: function(userData)
   {
    return new Promise(async (res,rej)=>
    {
        userData.Password=await bcrypt.hash(userData.Password,10)
        db.get().collection(collection.getUserCollection).insertOne(userData).then((data)=>
        {
            
            res(data)
        })
    })
   },
   doLogIn: function(userData)
   {
    let response={}
    return new Promise(async(res,rej)=>
    {
        let user=await db.get().collection(collection.getUserCollection).findOne({Email:userData.Email})
        console.log(user)
        if(user)
        {
              bcrypt.compare(userData.Password,user.Password).then((status)=>
              { if(status)
                {
                   
                   console.log("login success")
                   response.user=user
                   response.status=true
                   res(response)
                }
                else
                {
                    console.log("incorrect password")
                    response.status=false
                    res(response)
                }
                
                
              })

        }
        else
        { 
            console.log("invalid user")
            response.status=false
            res(response)
            

        }
    })
   }
}
