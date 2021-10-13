const express = require('express')

const router = express.Router();

module.exports = router;

const userRouter = require('./user')
const goodsRouter = require('./goods')

router.use(
    express.urlencoded({extended:true}),
    express.json()
)

// /api/goods
router.use('/goods',goodsRouter)

// /api/user
router.use('/user',userRouter)


// /login
router.get('/login',function(req,res){
    res.send('login')
})