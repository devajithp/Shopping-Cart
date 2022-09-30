var collection=require("../config/collection")
var db=require("../config/connection")

var objectId = require("mongodb").ObjectID

module.exports=
{
    doLogin: function(adminData)
    {
      return new Promise(async(res,rej)=>
      {
         let admins=await db.get().collection(collection.getAdminCollection).findOne({Email:adminData.Email})
         if(admins)
         {
            
            
                if(admins.Password==adminData.Password)
                {
                    console.log("login success")
                    res(admins)
                }
                else
                {
                     console.log("incorrect Password")
                     res(null)
                }
            
         }
         else
         {
                   console.log("invalid admin")
                   res(null)
         }
       })
      }

}