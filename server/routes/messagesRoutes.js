const { getAllMessages, addMessage } =require('../controllers/messagesController')
const router=require('express').Router();

router.post("/getmsg",getAllMessages)
router.post("/addmsg",addMessage)

module.exports=router