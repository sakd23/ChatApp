const messageModel = require("../model/messageModel")

module.exports.addMessage=async (req,res,next)=>{
    try{
       const {from,to,message}=req.body
       const data= await messageModel.create({
        message:{text:message},
        users:[from,to],
        sender:from,
       })

       if(data){
       return res.json({msg:"Message added successfully"})
        }

        return res.json({msg:"Message addition falied"})
    }
    catch(ex){
        next(ex)
    }
}
module.exports.getAllMessages=async (req,res,next)=>{
  try{
    const {to,from}=req.body
    const messages=await messageModel.find(
     {users:{
         $all:[to,from]
     }
     
    }).sort({updatedAt:1})
 
    const projectMessages=messages.map((msg)=>{
     return(
         {fromSelf:msg.sender.toString()===from,
          message:msg.message.text
         }
     )
     
    })
    return res.json(projectMessages)
  }
  catch(ex){
    next(ex)
  }
}