var express = require('express');
var router = express.Router();
var productHelpers= require("../Helpers/Product-helpers")
var promise=require("promise")
var adminHelpers=require("../Helpers/Admin-helpers")





router.get('/', function(req, res, next) {
  
 
      
    
    res.render("admin/adminHome",{admin:true})
 
  
});






module.exports = router;
