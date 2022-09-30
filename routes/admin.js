var express = require('express');
var router = express.Router();
var productHelpers= require("../Helpers/Product-helpers")
var promise=require("promise")






router.get('/', function(req, res, next) {
  
  productHelpers.getProduct().then((product)=>
  {
      
    
    res.render("admin/adminHome",{admin:true,product})
  })
  
});
router.get("/add-product",(req,res)=>
{
     res.render("admin/AddProduct",{admin:true})
}
)
router.post("/add-product",(req,res)=>
{
  
  productHelpers.addProduct(req.body,(id)=>
  {
   
    let image=req.files.Image
    image.mv("./public/product-images/"+id+".jpg",(err)=>
    {if(!err)
      res.redirect("/admin")
    })
    
    
  })
   
})
router.get("/edit-product/:id",(req,res)=>
{
  let prodId=req.params.id;
  console.log(prodId)
  productHelpers.editProduct(prodId).then((editingProduct)=>
  {
     console.log(editingProduct)
     res.render("admin/EditProduct",{editingProduct,admin:true})
  })
  
})
router.post("/edit-product/:id", (req,res)=>
{
  let prodId=req.params.id;
  productHelpers.updateProduct(prodId,req.body).then(()=>
  {
    res.redirect("/admin")
    if(req?.files?.Image)
    {
    let image=req.files.Image
    image.mv("./public/product-images/"+prodId+".jpg")
    }
    
  })   
})
router.get('/delete-product/:id',(req,res)=>
{
  let prodId=req.params.id;
  console.log(prodId)
  productHelpers.deleteProduct(prodId).then((status)=>
  {
    console.log(status)
    res.redirect("/admin/")
  })
})








module.exports = router;
