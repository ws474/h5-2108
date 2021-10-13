const express = require('express')

const goodsRouter = require('./goods')
const userRouter = require('./user')
const regRouter = require('./reg')
const loginRouter = require('./login')

const router = express.Router();
module.exports = router;

router.use(
    express.urlencoded({extended:false}),
    express.json(),
)


router.use('/user',userRouter)
router.use('/goods',goodsRouter)
router.use('/reg',regRouter)
router.use('/login',loginRouter)
