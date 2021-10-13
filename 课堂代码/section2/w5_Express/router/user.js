const express = require('express')

const router = express.Router();

module.exports = router;


// @用户CRUD
router.post('/',function(req,res){
    res.send('添加用户')
})
router.delete('/',function(req,res){
    res.send('删除用户')
})
router.put('/',function(req,res){
    res.send('修改用户')
})
router.get('/',function(req,res){
    res.send('查询用户')
})