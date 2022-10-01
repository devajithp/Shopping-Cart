const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers= require("../Helpers/Product-helpers")
var userHelpers=require("../Helpers/User-helpers")

const verifyLogin=function(req,res,next)
{
  if(req.session.userLogged)
  {
      next()
  }
  else
  {
    res.redirect("/login")
  }
}

router.get('/', function(req, res, next) {
  let user=req.session.user
  productHelpers.getProduct().then((product)=>
  {
    res.render('user/userHome', {user,product,admin:false});
  })
  
});
router.get("/login",(req,res)=>
{
    res.render("user/user-login")
})
router.get("/signup",(req,res)=>
{
  res.render("user/user-signup")
})
router.post("/signup",(req,res)=>
{
  console.log(req.body)
  userHelpers.doSignUp(req.body).then((data)=>
  {
    console.log(data)
    res.redirect("/login")
  })
})
router.post("/login",(req,res)=>
{
  let user=req.body;
  userHelpers.doLogIn(user).then((response)=>
  {
    if(response.status)
    {
      req.session.user=response.user
      req.session.userLogged=true

      res.redirect("/")
    }
    else{
      res.redirect("/login")
    }
  })
})
router.get("/logout",(req,res)=>
{
  req.session.destroy()
  res.redirect("/")
})
router.get("/cart",verifyLogin,(req,res)=>
{
   let user=req.session.user
   userHelpers.getCart(user._id).then((cartItems)=>
   {
    if(cartItems)
    {
    userHelpers.getCartWithoutAggregate(user._id).then((cart)=>
    { 
      userHelpers.getTotalAmount(user._id).then((total)=>
      {
        if(total)
        {
          totalAmount=total.totalAmount
        }
        else{
          totalAmount=0;
        }
        if(cart)
        {
          let Product=cart.Product
          if(Product.length>=1)
          {
            console.log(cartItems)
            res.render("user/cart",{admin:false,user,cartItems,totalAmount})
          }
          else{
            res.redirect("/")
          }
        }
        else
         {
          res.redirect("/")
         }
        
       
      })
    })
  }
  else{
    res.redirect("/")
  }
   })
})
router.get("/addtoCart/:id/:Name/:Price",verifyLogin,(req,res)=>
{
  let userId=req.session.user._id;
  let prodId=req.params.id;
  let prodName=req.params.Name;
  let prodPrice=req.params.Price;
  console.log(prodId,prodName,prodPrice,userId)
  userHelpers.AddtoCart(prodId,prodName,prodPrice,userId).then(()=>
  {
    res.redirect("/")
  })
  
})
router.get("/decrement/:prodId/:quantity",verifyLogin,(req,res)=>
{
  let prodId=req.params.prodId;
  let userId=req.session.user._id;
  let quantity=req.params.quantity;
  console.log(prodId,userId,quantity)
  userHelpers.decrementQuantity(userId,prodId,quantity).then(()=>
  {
    res.redirect("/cart")
  })    
})
router.get("/increment/:prodId/:quantity",verifyLogin,(req,res)=>
{
  let userId=req.session.user._id;
  let prodId=req.params.prodId;
  let quantity=req.params.quantity;
  console.log(userId,prodId,quantity)
  userHelpers.incrementQuantity(userId,prodId,quantity).then(()=>
  {
    res.redirect("/cart")
  })
})
router.get("/remove/:prodId/:quantity",verifyLogin,(req,res)=>
{
  let userId=req.session.user._id;
  let prodId=req.params.prodId;
  let quantity=req.params.quantity;
  console.log(userId,prodId,quantity)
  userHelpers.removeProduct(userId,prodId,quantity).then(()=>
  {
    res.redirect("/cart")
  })

})
router.get("/home",(req,res)=>
{
  res.redirect("/")
})
router.get("/order/:total",verifyLogin,(req,res)=>
{
  let user=req.session.user
  let total=req.params.total
  res.render("user/order",{total,admin:false,user})
})

module.exports = router;
