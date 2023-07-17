const express = require("express");
const router = express.Router()
const {addPost}=require('../controllers/post')
router.get('/',addPost)


module.exports=router